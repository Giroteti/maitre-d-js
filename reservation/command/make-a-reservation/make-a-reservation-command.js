class MakeAReservationCommand {
    constructor(
        restaurantId,
        date,
        numberOfGuests
    ) {
        this.restaurantId = restaurantId
        this.date = date
        this.numberOfGuests = numberOfGuests
    }
}
module.exports = MakeAReservationCommand;