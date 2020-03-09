exports.register = async function(server) {
    server.route([{
        method: 'POST',
        path: '/make-a-reservation',
        handler: di.provideMakeAReservationController().makeAReservation
    },
        {
            method: 'POST',
            path: '/add-a-restaurant',
            handler: di.provideAddARestaurantController().addARestaurant
        }
    ]);
}
exports.name = 'make-a-reservation';