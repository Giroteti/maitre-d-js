var assert = require('assert');
const { init } = require('../server');

describe('Make a reservation', function() {
    describe('routing', function() {

        let server;

        beforeEach(async () => {
            server = await init();
        });

        afterEach(async () => {
            await server.stop();
        });

        it('responds with reservation accepted - 200', async () => {
            const response = await server.inject({
                method: 'POST',
                url: '/make-a-reservation'
            });
            assert.equal(response.statusCode,200);
            assert.deepEqual(
                JSON.parse(response.payload),
                {
                    "restaurant": "La boutique",
                    "date": "2020-02-27",
                    "numberOfGuests": 12,
                    "tableNumber": 1
                }
            )
        });
    });
});