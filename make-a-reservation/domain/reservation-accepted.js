class ReservationAcceptedEvent {
    constructor(restaurant, date, numberOfGuests) {
        this.restaurant = restaurant
        this.date = date
        this.numberOfGuests = numberOfGuests
        this.tableNumber = 1
    }
}

module.exports = ReservationAcceptedEvent;