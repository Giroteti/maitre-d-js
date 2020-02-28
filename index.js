'use strict';
const { registerRoutes, init, start } = require('./server');
registerRoutes()
    .then(init)
    .then(start);