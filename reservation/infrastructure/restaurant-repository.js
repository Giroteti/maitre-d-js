const Restaurant = require("../domain/restaurant")

class RestaurantRepository {
    #restaurants = {
        "LaBoutiqueId" : new Restaurant("LaBoutiqueId", "La boutique")
    }

    getById(id)
    {
        // TODO get restaurant from persisted events
        let restaurant = this.#restaurants[id]
        if (restaurant == null) {
            throw new RestaurantNotFoundException(id)
        }
        return restaurant
    }
    save(events)
    {
        // TODO persist events
    }
}

function RestaurantNotFoundException(id) {
    this.message = `Restaurant "${id}" does not exist`;

    if ("captureStackTrace" in Error)
        Error.captureStackTrace(this, RestaurantNotFoundException);
    else
        this.stack = (new Error()).stack;
}

RestaurantNotFoundException.prototype = Object.create(Error.prototype);

module.exports = {
    RestaurantRepository: RestaurantRepository,
    RestaurantNotFoundException : RestaurantNotFoundException
}