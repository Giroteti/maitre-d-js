const RestaurantEventsPersistenceFailure = require("../../infrastructure/event-store-restaurant-repository").RestaurantEventsPersistenceFailure
const RestaurantAdded = require("../../domain/events/restaurant-added")
const {ValidationError} = require("@hapi/joi/lib/errors");


class AddARestaurantPresenter {
    present(events, h) {
        if (events[0] instanceof RestaurantAdded) {
            return events[0]
        } else {
            return h.response("New restaurant could not be added").code(500)
        }
    }
    presentException(exception, h) {
        if (exception instanceof RestaurantEventsPersistenceFailure) {
            return h.response({message:"New restaurant could not be added"}).code(500)
        } else if (exception instanceof ValidationError) {
            return h.response({message:exception.message}).code(400)
        } else {
            throw exception
        }
    }
}

module.exports = AddARestaurantPresenter