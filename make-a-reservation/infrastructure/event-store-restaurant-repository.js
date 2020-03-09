const axios = require('axios');
const uuid = require('uuid');
const Restaurant = require("../domain/restaurant");

class EventStoreRestaurantRepository {
    new({restaurantId, restautantName}) {
        let eventId = uuid.v4();
        return axios(
            {
                method:"post",
                url:"http://eventstore:2113/streams/"+restaurantId,
                data:{
                    "restaurant-name":restautantName
                },
                headers:{
                    "ES-EventType":"RestaurantCreated",
                    "ES-EventId": eventId
                },
                auth: {
                    username: 'admin',
                    password: 'changeit'
                }
            }
        ).then(function (response) {
            if (response.status !== 201) {
                throw RestaurantCreationFailedException(restautantName)
            } else {
                return new Restaurant(restaurantId, restautantName)
            }
        });
    }
}

function RestaurantCreationFailedException(name) {
    this.message = `Restaurant "${name}" could not be created`;

    if ("captureStackTrace" in Error)
        Error.captureStackTrace(this, RestaurantCreationFailedException);
    else
        this.stack = (new Error()).stack;
}

RestaurantCreationFailedException.prototype = Object.create(Error.prototype);


module.exports = EventStoreRestaurantRepository