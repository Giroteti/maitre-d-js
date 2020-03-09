'use strict';
const DependenciesInjection = require("./make-a-reservation/infrastructure/dependencies-injection")
const Hapi = require('@hapi/hapi');
const routes = require('./routes')

global.di = new DependenciesInjection()

exports.registerRoutes = async (customDi = null) => {
    if (customDi != null) {
        global.di = customDi
    }
    let server = Hapi.server({
        port: process.env.PORT || 3000
    });

    await server.register(routes);
    return server
}

exports.init = async (server) => {
    await server.initialize();
    return server;
};

exports.start = async (server) => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});