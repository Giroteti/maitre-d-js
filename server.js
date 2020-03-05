'use strict';
const DependenciesInjection = require("./make-a-reservation/infrastructure/dependencies-injection")
const Hapi = require('@hapi/hapi');
const routes = require ('./routes')

const server = Hapi.server({
    port: process.env.PORT || 3000
});

global.di = new DependenciesInjection()
let registered = false

exports.registerRoutes = async (customDi = null) => {
    if (customDi != null) {
        global.di = customDi
    }
    if (!registered) {
        await server.register(routes);
        registered = true
    }
}

exports.init = async () => {
    await server.initialize();
    return server;
};

exports.start = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});