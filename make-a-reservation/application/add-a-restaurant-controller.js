const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

class AddARestaurantController {
    constructor(repository) {
        this.repository = repository
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
            let restaurant = await this.repository.new(request.payload["restaurant-name"]);
            console.log(restaurant)
            return {"restaurant-id": restaurant.id}
        } catch (e) {
            console.log(e)
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

