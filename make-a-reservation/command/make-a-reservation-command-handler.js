const ReservationAcceptedEvent  = require('../domain/reservation-accepted');
const ReservationRejectedEvent  = require('../domain/reservation-rejected');

const MAX_NUMBER_OF_GUESTS = 12;

module.exports = function makeAReservation(
    {
        restaurant,
        date,
        numberOfGuests
    }
) {
    if (numberOfGuests > MAX_NUMBER_OF_GUESTS) {
        return new ReservationRejectedEvent(
            restaurant, date, numberOfGuests
        )
    }
    return new ReservationAcceptedEvent(restaurant, date, numberOfGuests)
};