const ReservationAcceptedEvent = require("./events/reservation-accepted");
const ReservationRejectedEvent = require("./events/reservation-rejected");
const RestaurantAdded = require("./events/restaurant-added")

class Restaurant {
    static #MAX_NUMBER_OF_GUESTS = 12;
    #remainingNumberOfSeatsPerDay = [];
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
        let restaurant = new Restaurant(null, null)
        events.forEach(event => {
            if (event instanceof RestaurantAdded) {
                restaurant.id = event.restaurantId
                restaurant.name = event.restaurantName
            } else if (event instanceof ReservationAcceptedEvent) {
                restaurant.book(event.date, event.numberOfGuests);
            }
        })
        return restaurant
    }

    book(date, numberOfGuests) {
        if (this.#remainingNumberOfSeatsPerDay[date] == null) {
            this.#remainingNumberOfSeatsPerDay[date] =
                Restaurant.#MAX_NUMBER_OF_GUESTS - numberOfGuests
        } else {
            this.#remainingNumberOfSeatsPerDay[date] -= numberOfGuests
        }
    }

    isBookable(date, numberOfGuests) {
        let remainingSeats = null
        if (this.#remainingNumberOfSeatsPerDay[date] == null) {
            remainingSeats = Restaurant.#MAX_NUMBER_OF_GUESTS
        } else {
            remainingSeats = this.#remainingNumberOfSeatsPerDay[date]
        }
        return remainingSeats >= numberOfGuests
    }

    makeAReservation(date, numberOfGuests) {
        if (this.isBookable(date, numberOfGuests)) {
            this.book(date, numberOfGuests)
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