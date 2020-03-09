const assert = require('assert');
const Restaurant = require("../reservation/domain/restaurant")
const RestaurantAddedEvent = require("../reservation/domain/events/restaurant-added")
const ReservationAcceptedEvent = require("../reservation/domain/events/reservation-accepted")
const ReservationRejectedEvent = require("../reservation/domain/events/reservation-rejected")

describe('Restaurant', function () {
    describe('Aggregat', function () {
        it('Should be initialized with correct name and id', async () => {
            // given
            let events = [
                new RestaurantAddedEvent(
                    "uuid",
                    "La boutique"
                )
            ]

            // when
            let restaurant = Restaurant.fromEvents(events)

            // then
            assert.deepEqual(
                restaurant,
                new Restaurant(
                    "uuid",
                    "La boutique"
                )
            )

        });

        it('Should accept reservation for 12 when no table is booked yet', async () => {
            // given
            let events = [
                new RestaurantAddedEvent(
                    "uuid",
                    "La boutique"
                )
            ]

            // when
            let restaurant = Restaurant.fromEvents(events)
            restaurant.makeAReservation("2020-03-09", 12)
            let domainEvents = restaurant.getDomainEvents()

            // then
            assert.deepEqual(
                domainEvents,
                [
                    new ReservationAcceptedEvent(
                        "uuid",
                        "La boutique",
                        "2020-03-09",
                        12
                    )
                ]
            )

        });

        it('Should reject reservation for 12+ even if no table is booked yet', async () => {
            // given
            let events = [
                new RestaurantAddedEvent(
                    "uuid",
                    "La boutique"
                )
            ]

            // when
            let restaurant = Restaurant.fromEvents(events)
            restaurant.makeAReservation("2020-03-09", 13)
            let domainEvents = restaurant.getDomainEvents()

            // then
            assert.deepEqual(
                domainEvents,
                [
                    new ReservationRejectedEvent(
                        "uuid",
                        "La boutique",
                        "2020-03-09",
                        13
                    )
                ]
            )
        });
    });
});