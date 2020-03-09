const RestaurantAddedEvent = require("../domain/restaurant-added")
module.exports = class AddARestaurantCommandHandler {
    constructor(repository) {
        this.repository = repository
    }

    async handle(
        {
            restaurantName
        }
    ) {
        let restaurant = await this.repository.new(restaurantName);
        return [
            new RestaurantAddedEvent(restaurant.id, restaurant.name)
        ]
    }
}