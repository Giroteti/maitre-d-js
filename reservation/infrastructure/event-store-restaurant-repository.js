const axios = require('axios');
const uuid = require('uuid');
const Restaurant = require("../domain/restaurant")
const RestaurantAddedEvent = require("../domain/events/restaurant-added")

class EventStoreRestaurantRepository {

    store(restaurant) {
        let data = restaurant.getDomainEvents().map(event =>
            this.toEventDTO(event.constructor.name, uuid.v4(), event)
        )
        return this.persist(restaurant.id, data)
    }

    async getById(id) {
        let config = {
            method: "get",
            url: "http://eventstore:2113/streams/" + id + "?embed=body",
            auth: {
                username: 'admin',
                password: 'changeit'
            },
            headers: {
                "Content-Type": "application/vnd.eventstore.events+json;charset=utf-8",
            }
        }
        return axios(
            config
        ).then(function (response) {
            if (response.status !== 200) {
                Promise.reject(new RestaurantNotFoundException(id))
            } else {
                let events = this.parseEvents(response.data.entries)
                return Restaurant.fromEvents(events)
            }
        }.bind(this));
    }

    parseEvents(entries) {
        return entries.map(event => {
                if (event.eventType === "RestaurantAddedEvent") {
                    let data = JSON.parse(event.data);
                    return new RestaurantAddedEvent(
                        data.restaurantId,
                        data.restaurantName
                    )
                }
            }
        );
    }

    toEventDTO(eventType, eventId, data) {
        return {
            eventType: eventType,
            eventId: eventId,
            data: data
        }
    }

    async persist(streamId, data) {
        let config = {
            method: "post",
            url: "http://eventstore:2113/streams/" + streamId,
            data: data,
            auth: {
                username: 'admin',
                password: 'changeit'
            },
            headers: {
                "Content-Type": "application/vnd.eventstore.events+json;charset=utf-8",
            }
        }
        return axios(
            config
        ).then(function (response) {
            if (response.status !== 201) {
                Promise.reject(new RestaurantEventsPersistenceFailure(streamId, data))
            } else {
                Promise.resolve()
            }
        });
    }
}

function RestaurantEventsPersistenceFailure(name, events) {
    this.message = `Restaurant "${name}"'s events "${JSON.stringify(events)}" could not be persisted`;

    if ("captureStackTrace" in Error)
        Error.captureStackTrace(this, RestaurantEventsPersistenceFailure);
    else
        this.stack = (new Error()).stack;
}

RestaurantEventsPersistenceFailure.prototype = Object.create(Error.prototype);

function RestaurantNotFoundException(id) {
    this.message = `Restaurant "${id}" does not exist`;

    if ("captureStackTrace" in Error)
        Error.captureStackTrace(this, RestaurantNotFoundException);
    else
        this.stack = (new Error()).stack;
}

RestaurantNotFoundException.prototype = Object.create(Error.prototype);

module.exports = {
    RestaurantRepository: EventStoreRestaurantRepository,
    RestaurantEventsPersistenceFailure: RestaurantEventsPersistenceFailure,
    RestaurantNotFoundException:RestaurantNotFoundException
}