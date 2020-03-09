const ReservationAcceptedEvent = require("./reservation-accepted");
const ReservationRejectedEvent = require("./reservation-rejected");
const RestaurantAdded = require("./restaurant-added")

class Restaurant {
    static #MAX_NUMBER_OF_GUESTS = 12;
    #events = [];
    constructor(id, name) {
        this.id = id
        this.name = name
    }

    static new(id, name) {
        let restaurant = new Restaurant(id, name)
        restaurant.#events.push(
            new RestaurantAdded(id, name)
        )
        return restaurant
    }

    makeAReservation(date, numberOfGuests) {
        if (numberOfGuests <= Restaurant.#MAX_NUMBER_OF_GUESTS) {
            this.#events.push(
                new ReservationAcceptedEvent(this.name, date, numberOfGuests)
            )
        } else {
            this.#events.push(
                new ReservationRejectedEvent(this.name, date, numberOfGuests)
            )
        }
    };

    getDomainEvents() {
        return this.#events
    }

    flushDomainEvents() {
        this.#events = []
    }
}
module.exports = Restaurant