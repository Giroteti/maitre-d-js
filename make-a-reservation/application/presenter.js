const ReservationAcceptedEvent = require("../domain/reservation-accepted")
const RestaurantRepository = require("../infrastructure/restaurant-repository")


class MakeAReservationPresenter {
    present(events, h) {
        if (events[0] instanceof ReservationAcceptedEvent) {
            return events[0]
        } else {
            return h.response(events[0]).code(409)
        }
    }
    presentException(exception, h) {
        if (exception instanceof RestaurantRepository.RestaurantNotFoundException) {
            return h.response({message:exception.message}).code(404)
        } else {
            throw exception
        }
    }
}

module.exports = MakeAReservationPresenter