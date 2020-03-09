var assert = require('assert');
const { init, registerRoutes } = require('../../server');
const DependenciesInjection = require("../../reservation/infrastructure/dependencies-injection")
const ReservationAcceptedEvent = require("../../reservation/domain/events/reservation-accepted")
const ReservationRejectedEvent = require("../../reservation/domain/events/reservation-rejected")
const RestaurantNotFoundException = require("../../reservation/infrastructure/event-store-restaurant-repository").RestaurantNotFoundException;

describe('Make a reservation', function() {
    describe('routing', function() {

        let server;

        beforeEach(async () => {
            server = await registerRoutes(new DependenciesInjectionForTest()).then(
                init
            )
        });

        afterEach(async () => {
            await server.stop();
        });

        it('responds with reservation accepted - 200', async () => {
            // When
            const response = await server.inject({
                method: 'POST',
                url: '/make-a-reservation',
                payload: {
                    "restaurant-id":"LaBoutiqueId",
                    "date":"2020-02-28",
                    "number-of-guests":12
                }
            });

            // Then
            assert.equal(response.statusCode,200);
            assert.deepEqual(
                JSON.parse(response.payload),
                {
                    "restaurantId": "LaBoutiqueId",
                    "restaurant": "La boutique",
                    "date": "2020-02-28",
                    "numberOfGuests": 12,
                    "tableNumber": 1
                }
            )
        });

        it('responds with reservation rejected - 409', async () => {
            // When
            const response = await server.inject({
                method: 'POST',
                url: '/make-a-reservation',
                payload: {
                    "restaurant-id":"LaBoutiqueId",
                    "date":"2020-02-28",
                    "number-of-guests":13
                }
            });

            // Then
            assert.equal(response.statusCode,409);
            assert.deepEqual(
                JSON.parse(response.payload),
                {
                    "restaurantId": "LaBoutiqueId",
                    "restaurant": "La boutique",
                    "date": "2020-02-28",
                    "numberOfGuests": 13
                }
            )
        });

        it('responds with error when uncaught exception - 500', async () => {
            // When
            const response = await server.inject({
                method: 'POST',
                url: '/make-a-reservation',
                payload: {
                    "restaurant-id":"500",
                    "date":"2020-02-28",
                    "number-of-guests":13
                }
            });

            // Then
            assert.equal(response.statusCode,500);
            assert.deepEqual(
                JSON.parse(response.payload),
                {
                    error: 'Internal Server Error',
                    message: 'An internal server error occurred',
                    statusCode: 500
                }
            )
        });

        it('responds with restaurant not found and 404 - 404', async () => {
            // When
            const response = await server.inject({
                method: 'POST',
                url: '/make-a-reservation',
                payload: {
                    "restaurant-id":"404",
                    "date":"2020-02-28",
                    "number-of-guests":12
                }
            });

            // Then
            assert.equal(response.statusCode,404);
            assert.deepEqual(
                JSON.parse(response.payload),
                {
                    "message": "Restaurant \"404\" does not exist"
                }
            )
        });

        it('responds with 400 when validation Error - 400', async () => {
            // When
            const response = await server.inject({
                method: 'POST',
                url: '/make-a-reservation',
                payload: {
                    "restaurant-id":"LaBoutiqueId",
                    "number-of-guests":12
                }
            });

            // Then
            assert.equal(response.statusCode,400);
            assert.deepEqual(
                JSON.parse(response.payload),
                {
                    "message":  "\"date\" is required"
                }
            )
        });
    });
});

class DependenciesInjectionForTest extends DependenciesInjection {
    provideCommandHandler() {
        let handler = {
            handle (
                {
                    restaurantId,
                    date,
                    numberOfGuests
                }
            ) {
                if (restaurantId == "500") {
                    throw new Error("whatever")
                } else if (restaurantId == "404") {
                    throw new RestaurantNotFoundException("404")
                }

                if (numberOfGuests <= 12) {
                    return [new ReservationAcceptedEvent(
                        "LaBoutiqueId", "La boutique", date, numberOfGuests
                    )]
                } else {
                    return [new ReservationRejectedEvent(
                        "LaBoutiqueId","La boutique", date, numberOfGuests
                    )]
                }
            }
        }
        return handler
    }
}