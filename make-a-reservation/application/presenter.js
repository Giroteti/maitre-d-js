const ReservationAcceptedEvent = require("../domain/reservation-accepted")

class MakeAReservationPresenter {
    present(events, h) {
        if (events[0] instanceof ReservationAcceptedEvent) {
            return events[0]
        } else {
            return h.response(events[0]).code(409)
        }
    }
}

module.exports = MakeAReservationPresenter