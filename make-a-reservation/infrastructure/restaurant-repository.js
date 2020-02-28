const Restaurant = require("../domain/restaurant")
class RestaurantRepository {
    getByName(name) {
        // TODO Use a database
        return new Restaurant(name)
    }
}
module.exports = RestaurantRepository