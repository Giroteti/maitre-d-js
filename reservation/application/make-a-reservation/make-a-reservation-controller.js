const MakeAReservationCommand = require("../../command/make-a-reservation/make-a-reservation-command")
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

class MakeAReservationController {
    constructor(handler, presenter) {
        this.handler = handler
        this.presenter = presenter
        this.makeAReservation = this.makeAReservation.bind(this)
    }

    static #schema = Joi.object(
        {
            "restaurant": Joi.string().min(1).required(),
            "date": Joi.date().format("YYYY-MM-DD").raw().required(),
            "number-of-guests": Joi.number().min(1)
        }
    )

    async makeAReservation(request, h) {
        try {
            this.validate(request)
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

    validate(request) {
        const { error, value } = MakeAReservationController.#schema.validate(request.payload)
        if (error !== undefined) throw error
    }
}

module.exports = MakeAReservationController

