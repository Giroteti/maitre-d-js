const ReservationAcceptedEvent = require("../domain/reservation-accepted")

module.exports = function present(response, h) {
    if (response instanceof ReservationAcceptedEvent) {
        return response
    } else {
        return h.response(response).code(409)
    }
}