const MakeAReservationCommand = require("../command/make-a-reservation-command")

class MakeAReservationController {
    constructor(handler, presenter) {
        this.handler = handler
        this.presenter = presenter
        this.makeAReservation = this.makeAReservation.bind(this)
    }
    async makeAReservation(request, h) {
        let events = this.handler.handle(
            new MakeAReservationCommand(
                "La boutique",
                "2020-02-27",
                request.payload["number-of-guests"]
            )
        )
        return this.presenter.present(events, h);
    }
}

module.exports = MakeAReservationController

