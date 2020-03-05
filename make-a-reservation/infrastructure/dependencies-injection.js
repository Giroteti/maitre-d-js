const MakeAReservationController = require('../application/controller');
const MakeAReservationCommandHandler = require("../command/make-a-reservation-command-handler")
const RestaurantRepository = require("../infrastructure/restaurant-repository").RestaurantRepository
const MakeAReservationPresenter = require("../application/presenter")

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

    provideController() {
        return new MakeAReservationController(
            this.provideCommandHandler(),
            this.providePresenter()
        )
    }
}

module.exports = DependenciesInjection