const MakeAReservationController = require('../application/make-a-reservation/make-a-reservation-controller');
const MakeAReservationCommandHandler = require("../command/make-a-reservation/make-a-reservation-command-handler")
const MakeAReservationPresenter = require("../application/make-a-reservation/make-a-reservation-presenter")
const AddARestaurantController = require('../application/add-a-restaurant/add-a-restaurant-controller')
const EventStoreRestaurantRepository = require("../infrastructure/event-store-restaurant-repository").RestaurantRepository
const AddARestaurantCommandHandler = require("../command/add-a-restaurant/add-a-restaurant-command-handler")
const UUIDGenerator = require("./uuid-generator");
const AddARestaurantPresenter = require("../application/add-a-restaurant/add-a-restaurant-presenter")

class DependenciesInjection {

    provideCommandHandler() {
        return new MakeAReservationCommandHandler(
            this.provideEventStoreRepository()
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

    provideAddARestaurantPresenter() {
        return new AddARestaurantPresenter()
    }

    provideAddARestaurantController() {
        return new AddARestaurantController(
            this.provideAddARestaurantCommandHandler(),
            this.provideAddARestaurantPresenter()
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