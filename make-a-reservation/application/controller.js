const MakeAReservationCommand = require("../command/make-a-reservation-command")
const commandHandler = require("../command/make-a-reservation-command-handler")
const ReservationAcceptedEvent = require("../domain/reservation-accepted")

module.exports = {
    async makeAReservation(request, h) {
        let response = commandHandler(
            new MakeAReservationCommand(
                "La boutique",
                "2020-02-27",
                request.payload["number-of-guests"]
            )
        )
        if (response instanceof ReservationAcceptedEvent) {
            return response
        } else {
            return h.response(response).code(409)
        }
    }
}