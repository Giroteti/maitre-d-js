var assert = require('assert');
const AddARestaurantCommand = require("../../make-a-reservation/command/add-a-restaurant-command");
const RestaurantAddedEvent = require("../../make-a-reservation/domain/restaurant-added");
const Restaurant = require("../../make-a-reservation/domain/restaurant");
const AddARestaurantCommandHandler = require("../../make-a-reservation/command/add-a-restaurant-command-handler");
const DependenciesInjection = require("../../make-a-reservation/infrastructure/dependencies-injection");

describe('Add a reservation', function () {
    describe('Command handler', function () {
        it('Should add a restaurant', async () => {
            // given
            let commandHandler = new DependenciesInjectionForTest().provideAddARestaurantCommandHandler()

            // when
            let events = await commandHandler.handle(
                new AddARestaurantCommand(
                    "La boutique"
                )
            )

            // then
            assert.deepEqual(
                events[0],
                new RestaurantAddedEvent("uuid", "La boutique")
            )
        })
    })
})


class DependenciesInjectionForTest extends DependenciesInjection {
    provideEventStoreRepository() {
        return {
            async store(restaurant) {
                return Promise.resolve()
            }
        }
    }

    provideUUIDGenerator() {
        return {
            next() {
                return "uuid"
            }
        }
    }

    provideAddARestaurantCommandHandler() {
        return new AddARestaurantCommandHandler(
            this.provideEventStoreRepository(),
            this.provideUUIDGenerator()
        )
    }
}