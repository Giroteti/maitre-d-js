const Restaurant = require("../domain/restaurant")
module.exports = class AddARestaurantCommandHandler {
    constructor(repository, idGenerator) {
        this.repository = repository
        this.idGenerator = idGenerator
    }

    async handle(
        {
            restaurantName
        }
    ) {
        let restaurant = Restaurant.new(this.idGenerator.next(), restaurantName);
        let events = restaurant.getDomainEvents();
        await this.repository.new(events[0]);
        return events
    }
}