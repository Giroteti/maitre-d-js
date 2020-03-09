class ReservationRejectedEvent {
    constructor(restaurantId, restaurant, date, numberOfGuests) {
        this.restaurantId = restaurantId
        this.restaurant = restaurant
        this.date = date
        this.numberOfGuests = numberOfGuests
    }
}

module.exports = ReservationRejectedEvent;