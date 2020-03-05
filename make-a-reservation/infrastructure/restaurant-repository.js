const Restaurant = require("../domain/restaurant")

class RestaurantRepository {
    #restaurants = {
        "La boutique" : new Restaurant("La boutique")
    }

    getByName(name)
    {
        // TODO get restaurant from persisted events
        let restaurant = this.#restaurants[name]
        if (restaurant == null) {
            throw new RestaurantNotFoundException(name)
        }
        return restaurant
    }

    save(events)
    {
        // TODO persist events
    }
}

function RestaurantNotFoundException(name) {
    this.message = `Restaurant "${name}" does not exist`;

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