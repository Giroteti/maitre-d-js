module.exports = class MakeAReservationCommandHandler{
    constructor(repository) {
        this.repository = repository
    }

    handle (
        {
            restaurant,
            date,
            numberOfGuests
        }
    ) {
        let restaurantAggregate = this.repository.getByName(restaurant)
        restaurantAggregate.makeAReservation(date, numberOfGuests)
        return restaurantAggregate.getDomainEvents()
    }
}