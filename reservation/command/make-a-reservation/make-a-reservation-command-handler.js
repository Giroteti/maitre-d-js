module.exports = class MakeAReservationCommandHandler{
    constructor(repository) {
        this.repository = repository
    }

    async handle (
        {
            restaurantId,
            date,
            numberOfGuests
        }
    ) {
        let restaurant = await this.repository.getById(restaurantId)
        restaurant.makeAReservation(date, numberOfGuests)
        let events = restaurant.getDomainEvents()
        this.repository.store(restaurant)
        restaurant.flushDomainEvents()
        return events
    }
}