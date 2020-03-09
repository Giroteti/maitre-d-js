const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const AddARestaurantCommand = require("../command/add-a-restaurant-command")

class AddARestaurantController {
    constructor(handler) {
        this.handler = handler
        this.addARestaurant = this.addARestaurant.bind(this)
    }

    static #schema = Joi.object(
        {
            "restaurant-name": Joi.string().min(1).required(),
        }
    )

    async addARestaurant(request, h) {
        try {
            this.validate(request)
            let events = await this.handler.handle(
                new AddARestaurantCommand(
                    request.payload["restaurant-name"]
                )
            )
            return events[0]
        } catch (e) {
            let response = {"message":"KO"}
            return response
        }
    }

    validate(request) {
        const { error, value } = AddARestaurantController.#schema.validate(request.payload)
        if (error !== undefined) throw error
    }
}

module.exports = AddARestaurantController

