const ReservationAcceptedEvent  = require('../domain/events');
module.exports = function makeAReservation(
    {
        restaurant,
        date,
        numberOfGuests
    }
) {
    return new ReservationAcceptedEvent(restaurant, date, numberOfGuests)
};