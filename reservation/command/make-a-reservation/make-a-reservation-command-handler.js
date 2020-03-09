module.exports = class MakeAReservationCommandHandler{
    constructor(repository) {
        this.repository = repository
    }

    handle (
        {
            restaurantId,
            date,
            numberOfGuests
        }
    ) {
        let restaurantAggregate = this.repository.getById(restaurantId)
        restaurantAggregate.makeAReservation(date, numberOfGuests)
        let events = restaurantAggregate.getDomainEvents()
        this.repository.save(events)
        restaurantAggregate.flushDomainEvents()
        return events
    }
}