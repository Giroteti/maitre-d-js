var assert = require('assert');
const DependenciesInjection = require("../make-a-reservation/infrastructure/dependencies-injection")
const MakeAReservationCommand = require("../make-a-reservation/command/make-a-reservation-command")
const ReservationAcceptedEvent = require("../make-a-reservation/domain/reservation-accepted")
const ReservationRejectedEvent = require("../make-a-reservation/domain/reservation-rejected")

describe('Make a reservation', function () {
    describe('Command handler', function () {
        it('Should accept a reservation when no table is booked yet and enough capacity', () => {
            // Given
            let handler = new DependenciesInjection().provideCommandHandler()
            let command = new MakeAReservationCommand(
                "La boutique",
                "2020-28-02",
                12
            )

            // When
            let events = handler.handle(command)

            // Then
            assert.deepEqual(
                events[0],
                new ReservationAcceptedEvent("La boutique", "2020-28-02", 12)
            )
        })

        it('Should reject a reservation when no table is booked yet but not enough capacity', () => {
            // Given
            let handler = new DependenciesInjection().provideCommandHandler()
            let command = new MakeAReservationCommand(
                "La boutique",
                "2020-28-02",
                13
            )

            // When
            let events = handler.handle(command)

            // Then
            assert.deepEqual(
                events[0],
                new ReservationRejectedEvent("La boutique", "2020-28-02", 13)
            )
        })
    })
})

