var assert = require('assert');
const { init, registerRoutes } = require('../server');
const DependenciesInjection = require("../make-a-reservation/infrastructure/dependencies-injection")
const ReservationAcceptedEvent = require("../make-a-reservation/domain/reservation-accepted")
const ReservationRejectedEvent = require("../make-a-reservation/domain/reservation-rejected")

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
                    "number-of-guests":12
                }
            });

            // Then
            assert.equal(response.statusCode,200);
            assert.deepEqual(
                JSON.parse(response.payload),
                {
                    "restaurant": "La boutique",
                    "date": "2020-02-27",
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
                    "number-of-guests":13
                }
            });

            // Then
            assert.equal(response.statusCode,409);
            assert.deepEqual(
                JSON.parse(response.payload),
                {
                    "restaurant": "La boutique",
                    "date": "2020-02-27",
                    "numberOfGuests": 13
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
                if (numberOfGuests <= 12) {
                    return [new ReservationAcceptedEvent(
                        "La boutique", "2020-02-27", numberOfGuests
                    )]
                } else {
                    return [new ReservationRejectedEvent(
                        "La boutique", "2020-02-27", numberOfGuests
                    )]
                }
            }
        }
        return handler
    }
}