exports.register = async function(server) {
    server.route([{
        method: 'POST',
        path: '/make-a-reservation',
        handler: di.provideController().makeAReservation
    }]);
}
exports.name = 'make-a-reservation';