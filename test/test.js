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

        it('responds with 200', async () => {
            const res = await server.inject({
                method: 'POST',
                url: '/make-a-reservation'
            });
            assert.equal(res.statusCode,200);
        });
    });
});