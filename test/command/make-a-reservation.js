var assert = require('assert');
const DependenciesInjection = require("../../reservation/infrastructure/dependencies-injection")
const MakeAReservationCommand = require("../../reservation/command/make-a-reservation/make-a-reservation-command")
const ReservationAcceptedEvent = require("../../reservation/domain/events/reservation-accepted")

describe('Make a reservation', function () {
    describe('Command handler', function () {
        it('Should return aggreggate generated events', async () => {
            // Given
            let handler = new DependenciesInjectionForTest().provideMakeAReservationCommandHandler()
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
    })
})


class DependenciesInjectionForTest extends DependenciesInjection {
    provideEventStoreRepository() {
        return {
            async store(restaurant) {
                return Promise.resolve()
            },
            async getById(id) {
                return {
                    id: id,
                    name: "La boutique",
                    makeAReservation(date, numberOfGuests) {
                        // Do nothing
                    },
                    getDomainEvents() {
                        return [
                            new ReservationAcceptedEvent(
                                id,
                                "La boutique",
                                "2020-28-02",
                                12
                            )
                        ]
                    },
                    flushDomainEvents() {
                        // Do nothing
                    }
                }
            }
        }
    }
}

