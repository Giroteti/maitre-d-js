class RestaurantAddedEvent {
    constructor(restaurantId, restaurantName) {
        this.restaurantId = restaurantId
        this.restaurantName = restaurantName
    }
}

module.exports = RestaurantAddedEvent;