const ReservationAcceptedEvent = require("./reservation-accepted");
const ReservationRejectedEvent = require("./reservation-rejected");

class Restaurant {
    static #MAX_NUMBER_OF_GUESTS = 12;
    #events = [];
    constructor(name) {
        this.name = name
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