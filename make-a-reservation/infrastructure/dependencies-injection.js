const MakeAReservationController = require('../application/controller');
const MakeAReservationCommandHandler = require("../command/make-a-reservation-command-handler")
const RestaurantRepository = require("../infrastructure/restaurant-repository").RestaurantRepository
const MakeAReservationPresenter = require("../application/presenter")
const AddARestaurantController = require('../application/add-a-restaurant-controller')
const EventStoreRestaurantRepository = require("../infrastructure/event-store-restaurant-repository")

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

    provideEventStoreRepository(){
        return new EventStoreRestaurantRepository()
    }
    provideAddARestaurantController() {
        return new AddARestaurantController(
            this.provideEventStoreRepository()
        )
    }
}

module.exports = DependenciesInjection