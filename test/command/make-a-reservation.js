var assert = require('assert');
const DependenciesInjection = require("../../reservation/infrastructure/dependencies-injection")
const MakeAReservationCommand = require("../../reservation/command/make-a-reservation/make-a-reservation-command")
const ReservationAcceptedEvent = require("../../reservation/domain/events/reservation-accepted")
const ReservationRejectedEvent = require("../../reservation/domain/events/reservation-rejected")

describe('Make a reservation', function () {
    describe('Command handler', function () {
        it('Should accept a reservation when no table is booked yet and enough capacity', () => {
            // Given
            let handler = new DependenciesInjection().provideCommandHandler()
            let command = new MakeAReservationCommand(
                "LaBoutiqueId",
                "2020-28-02",
                12
            )

            // When
            let events = handler.handle(command)

            // Then
            assert.deepEqual(
                events[0],
                new ReservationAcceptedEvent("LaBoutiqueId", "La boutique", "2020-28-02", 12)
            )
        })

        it('Should reject a reservation when no table is booked yet but not enough capacity', () => {
            // Given
            let handler = new DependenciesInjection().provideCommandHandler()
            let command = new MakeAReservationCommand(
                "LaBoutiqueId",
                "2020-28-02",
                13
            )

            // When
            let events = handler.handle(command)

            // Then
            assert.deepEqual(
                events[0],
                new ReservationRejectedEvent("LaBoutiqueId", "La boutique", "2020-28-02", 13)
            )
        })
    })
})

