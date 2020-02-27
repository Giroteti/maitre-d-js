const MakeAReservationCommand = require("../command/make-a-reservation-command")
const commandHandler = require("../command/make-a-reservation-command-handler")
const presenter = require("./presenter")

module.exports = {
async makeAReservation(request, h) {
        let response = commandHandler(
            new MakeAReservationCommand(
                "La boutique",
                "2020-02-27",
                request.payload["number-of-guests"]
            )
        )
        return presenter(response, h);
    }
}