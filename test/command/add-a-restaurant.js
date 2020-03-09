var assert = require('assert');
const AddARestaurantCommand = require("../../reservation/command/add-a-restaurant/add-a-restaurant-command");
const RestaurantAddedEvent = require("../../reservation/domain/events/restaurant-added");
const Restaurant = require("../../reservation/domain/restaurant");
const AddARestaurantCommandHandler = require("../../reservation/command/add-a-restaurant/add-a-restaurant-command-handler");
const DependenciesInjection = require("../../reservation/infrastructure/dependencies-injection");

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