class MakeAReservationCommand {
    constructor(
        restaurant,
        date,
        numberOfGuests
    ) {
        this.restaurant = restaurant
        this.date = date
        this.numberOfGuests = numberOfGuests
    }
}
module.exports = MakeAReservationCommand;