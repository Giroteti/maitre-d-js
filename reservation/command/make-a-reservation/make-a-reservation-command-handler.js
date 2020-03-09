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
        let events = restaurantAggregate.getDomainEvents()
        this.repository.save(events)
        restaurantAggregate.flushDomainEvents()
        return events
    }
}