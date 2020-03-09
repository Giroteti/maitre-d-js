const MakeAReservationController = require('../application/controller');
const MakeAReservationCommandHandler = require("../command/make-a-reservation-command-handler")
const RestaurantRepository = require("../infrastructure/restaurant-repository").RestaurantRepository
const MakeAReservationPresenter = require("../application/presenter")
const AddARestaurantController = require('../application/add-a-restaurant-controller')
const EventStoreRestaurantRepository = require("../infrastructure/event-store-restaurant-repository")
const AddARestaurantCommandHandler = require("../command/add-a-restaurant-command-handler")
const UUIDGenerator = require("./uuid-generator")

class DependenciesInjection {
    provideRestaurantRepository() {
        return new RestaurantRepository()
    }

    provideCommandHandler() {
        return new MakeAReservationCommandHandler(
            this.provideRestaurantRepository()
        )
    }

    providePresenter() {
        return new MakeAReservationPresenter()
    }

    provideMakeAReservationController() {
        return new MakeAReservationController(
            this.provideCommandHandler(),
            this.providePresenter()
        )
    }

    provideEventStoreRepository() {
        return new EventStoreRestaurantRepository()
    }

    provideAddARestaurantController() {
        return new AddARestaurantController(
            this.provideAddARestaurantCommandHandler()
        )
    }

    provideUUIDGenerator() {
        return new UUIDGenerator()
    }

    provideAddARestaurantCommandHandler() {
        return new AddARestaurantCommandHandler(
            this.provideEventStoreRepository(),
            this.provideUUIDGenerator()
        )
    }
}

module.exports = DependenciesInjection