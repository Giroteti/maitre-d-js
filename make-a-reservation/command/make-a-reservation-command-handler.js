const Restaurant = require("../domain/restaurant")

module.exports = function makeAReservation(
    {
        restaurant,
        date,
        numberOfGuests
    }
) {
    let restaurantAggregate = new Restaurant(restaurant)
    restaurantAggregate.makeAReservation(date, numberOfGuests)
    return restaurantAggregate.getDomainEvents()
};