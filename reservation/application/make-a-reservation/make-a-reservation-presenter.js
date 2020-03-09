const ReservationAcceptedEvent = require("../../domain/events/reservation-accepted")
const RestaurantNotFoundException = require("../../infrastructure/event-store-restaurant-repository").RestaurantNotFoundException
const {ValidationError} = require("@hapi/joi/lib/errors");


class MakeAReservationPresenter {
    present(events, h) {
        if (events[0] instanceof ReservationAcceptedEvent) {
            return events[0]
        } else {
            return h.response(events[0]).code(409)
        }
    }
    presentException(exception, h) {
        if (exception instanceof RestaurantNotFoundException) {
            return h.response({message:exception.message}).code(404)
        } else if (exception instanceof ValidationError) {
            return h.response({message:exception.message}).code(400)
        } else {
            throw exception
        }
    }
}

module.exports = MakeAReservationPresenter