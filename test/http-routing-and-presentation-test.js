var assert = require('assert');
const { init, registerRoutes } = require('../server');
const DependenciesInjection = require("../make-a-reservation/infrastructure/dependencies-injection")
const ReservationAcceptedEvent = require("../make-a-reservation/domain/reservation-accepted")
const ReservationRejectedEvent = require("../make-a-reservation/domain/reservation-rejected")
const RestaurantNotFoundException = require("../make-a-reservation/infrastructure/restaurant-repository").RestaurantNotFoundException;

describe('Make a reservation', function() {
    describe('routing', function() {

        let server;

        beforeEach(async () => {
            await registerRoutes(new DependenciesInjectionForTest())
            server = await init()
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
                    "restaurant":"La boutique",
                    "date":"2020-02-28",
                    "number-of-guests":12
                }
            });

            // Then
            assert.equal(response.statusCode,200);
            assert.deepEqual(
                JSON.parse(response.payload),
                {
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
                    "restaurant":"La boutique",
                    "date":"2020-02-28",
                    "number-of-guests":13
                }
            });

            // Then
            assert.equal(response.statusCode,409);
            assert.deepEqual(
                JSON.parse(response.payload),
                {
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
                    "restaurant":"500",
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
                    "restaurant":"404",
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
                    "restaurant":"La boutique",
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
                    restaurant,
                    date,
                    numberOfGuests
                }
            ) {
                if (restaurant == "500") {
                    throw new Error("whatever")
                } else if (restaurant == "404") {
                    throw new RestaurantNotFoundException("404")
                }

                if (numberOfGuests <= 12) {
                    return [new ReservationAcceptedEvent(
                        restaurant, date, numberOfGuests
                    )]
                } else {
                    return [new ReservationRejectedEvent(
                        restaurant, date, numberOfGuests
                    )]
                }
            }
        }
        return handler
    }
}