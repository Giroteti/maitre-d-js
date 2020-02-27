exports.register = async function(server) {
    server.route([{
        method: 'POST',
        path: '/make-a-reservation',
        handler: (request, h) => {
            return "{}"
        }
    }]);
}
exports.name = 'make-a-reservation';