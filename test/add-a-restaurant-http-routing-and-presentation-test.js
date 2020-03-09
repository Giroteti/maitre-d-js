var assert = require('assert');
const { init, registerRoutes } = require('../server');
const DependenciesInjection = require("../make-a-reservation/infrastructure/dependencies-injection")
const RestaurantAddedEvent = require("../make-a-reservation/domain/restaurant-added")
const RestaurantEventsPersistenceFailure = require("../make-a-reservation/infrastructure/event-store-restaurant-repository").RestaurantEventsPersistenceFailure
describe('Add a restaurant', function() {
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

        it('responds with restaurant added - 200', async () => {
            // When
            const response = await server.inject({
                method: 'POST',
                url: '/add-a-restaurant',
                payload: {
                    "restaurant-name":"La boutique"
                }
            });

            // Then
            assert.equal(response.statusCode,200);
            assert.deepEqual(
                JSON.parse(response.payload),
                {
                    "restaurantId": "uuid",
                    "restaurantName": "La boutique"
                }
            )
        });

        it('responds with error when uncaught exception - 500', async () => {
            // When
            const response = await server.inject({
                method: 'POST',
                url: '/add-a-restaurant',
                payload: {
                    "restaurant-name":"500"
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

        it('responds with 400 when validation Error - 400', async () => {
            // When
            const response = await server.inject({
                method: 'POST',
                url: '/add-a-restaurant',
                payload: {
                }
            });

            // Then
            assert.equal(response.statusCode,400);
            assert.deepEqual(
                JSON.parse(response.payload),
                {
                    "message":  "\"restaurant-name\" is required"
                }
            )
        });

        it('responds with 500 when persitence failure - 500', async () => {
            // When
            const response = await server.inject({
                method: 'POST',
                url: '/add-a-restaurant',
                payload: {
                    "restaurant-name":"persitenceFailure"
                }
            });

            // Then
            assert.equal(response.statusCode,500);
            assert.deepEqual(
                JSON.parse(response.payload),
                {
                    "message":  "New restaurant could not be added"
                }
            )
        });
    });
});

class DependenciesInjectionForTest extends DependenciesInjection {
    provideAddARestaurantCommandHandler() {
        return {
            handle(
                {
                    restaurantName
                }
            ) {
                if (restaurantName == "500") {
                    throw new Error("whatever")
                } else if (restaurantName == "persitenceFailure") {
                    throw new RestaurantEventsPersistenceFailure("uuid", [{whatever:"events"}])
                }

                return [
                    new RestaurantAddedEvent(
                        "uuid",
                        restaurantName
                    )
                ]
            }
        }
    }
}