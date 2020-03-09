var assert = require('assert');
const DependenciesInjection = require("../../reservation/infrastructure/dependencies-injection")
const MakeAReservationCommand = require("../../reservation/command/make-a-reservation/make-a-reservation-command")
const ReservationAcceptedEvent = require("../../reservation/domain/events/reservation-accepted")
const ReservationRejectedEvent = require("../../reservation/domain/events/reservation-rejected")
const Restaurant = require("../../reservation/domain/restaurant")

describe('Make a reservation', function () {
    describe('Command handler', function () {
        it('Should accept a reservation when no table is booked yet and enough capacity', async () => {
            // Given
            let handler = new DependenciesInjectionForTest().provideCommandHandler()
            let command = new MakeAReservationCommand(
                "LaBoutiqueId",
                "2020-28-02",
                12
            )

            // When
            let events = await handler.handle(command)

            // Then
            assert.deepEqual(
                events[0],
                new ReservationAcceptedEvent("LaBoutiqueId", "La boutique", "2020-28-02", 12)
            )
        })

        it('Should reject a reservation when no table is booked yet but not enough capacity', async () => {
            // Given
            let handler = new DependenciesInjectionForTest().provideCommandHandler()
            let command = new MakeAReservationCommand(
                "LaBoutiqueId",
                "2020-28-02",
                13
            )

            // When
            let events = await handler.handle(command)

            // Then
            assert.deepEqual(
                events[0],
                new ReservationRejectedEvent("LaBoutiqueId", "La boutique", "2020-28-02", 13)
            )
        })
    })
})


class DependenciesInjectionForTest extends DependenciesInjection {
    provideEventStoreRepository() {
        return {
            async store(restaurant) {
                return Promise.resolve()
            },
            async getById(id) {
                return new Restaurant(id, "La boutique")
            }
        }
    }

    provideUUIDGenerator() {
        return {
            next() {
                return "uuid"
            }
        }
    }

    provideAddARestaurantCommandHandler() {
        return new AddARestaurantCommandHandler(
            this.provideEventStoreRepository(),
            this.provideUUIDGenerator()
        )
    }
}

