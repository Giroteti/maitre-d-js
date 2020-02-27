const MakeAReservationCommand = require("../command/make-a-reservation-command")
const commandHandler = require("../command/make-a-reservation-command-handler")
module.exports = {
    async makeAReservation(request, h) {
        return commandHandler(
            new MakeAReservationCommand(
                "La boutique",
                "2020-02-27",
                12
            )
        )
    }
}