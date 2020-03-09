class ReservationAcceptedEvent {
    constructor(restaurantId, restaurant, date, numberOfGuests) {
        this.restaurantId = restaurantId
        this.restaurant = restaurant
        this.date = date
        this.numberOfGuests = numberOfGuests
        this.tableNumber = 1
    }
}

module.exports = ReservationAcceptedEvent;