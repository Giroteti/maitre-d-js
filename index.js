'use strict';
const { start } = require('./server');
const { init } = require('./server')
init().then(start);