const MakeAReservationCommand = require("../command/make-a-reservation-command")

class MakeAReservationController {
    constructor(handler, presenter) {
        this.handler = handler
        this.presenter = presenter
        this.makeAReservation = this.makeAReservation.bind(this)
    }
    async makeAReservation(request, h) {
        try {
            let events = this.handler.handle(
                new MakeAReservationCommand(
                    request.payload["restaurant"],
                    request.payload["date"],
                    request.payload["number-of-guests"]
                )
            )
            return this.presenter.present(events, h);
        } catch (e) {
            return this.presenter.presentException(e, h);
        }
    }
}

module.exports = MakeAReservationController

