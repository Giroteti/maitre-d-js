const ReservationAcceptedEvent = require("./events/reservation-accepted");
const ReservationRejectedEvent = require("./events/reservation-rejected");
const RestaurantAdded = require("./events/restaurant-added")

class Restaurant {
    static #MAX_NUMBER_OF_GUESTS = 12;
    #remainingNumberOfSeats = Restaurant.#MAX_NUMBER_OF_GUESTS;
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

    static fromEvents(events) {
        let id = null
        let name = null
        let numberOfBookedSeats = 0
        events.forEach( event => {
            if (event instanceof RestaurantAdded) {
                id = event.restaurantId
                name = event.restaurantName
            } else if (event instanceof ReservationAcceptedEvent) {
                numberOfBookedSeats += event.numberOfGuests
            }
        })
        let restaurant = new Restaurant(id, name)
        restaurant.#remainingNumberOfSeats -= numberOfBookedSeats
        return restaurant
    }

    makeAReservation(date, numberOfGuests) {
        if (numberOfGuests <= this.#remainingNumberOfSeats) {
            this.#events.push(
                new ReservationAcceptedEvent(this.id, this.name, date, numberOfGuests)
            )
        } else {
            this.#events.push(
                new ReservationRejectedEvent(this.id, this.name, date, numberOfGuests)
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