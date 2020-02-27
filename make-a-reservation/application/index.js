const controller = require('./controller');
exports.register = async function(server) {
    server.route([{
        method: 'POST',
        path: '/make-a-reservation',
        handler: controller.makeAReservation
    }]);
}
exports.name = 'make-a-reservation';