require('dotenv').config();
global.chai = require('chai');
global.chaiHttp = require('chai-http');
chai.use(chaiHttp);
// more information about this import approach: https://stackoverflow.com/questions/70541068
const chaiAsPromised = (...args) => import('chai-as-promised')
    .then(({default: chaiAsPromised}) => chaiAsPromised(...args));
global.chaiPromised = chaiAsPromised;
chai.use(chaiPromised);
chai.config.includeStack = true;
global.expect = require('chai').expect;
global.itParam = require('mocha-param').itParam;

// Integration core
global.SwapiRequests =
    require('./api/rest-client/requests/SwapiRequests');
global.DogRequests =
    require('./api/rest-client/requests/DogRequests');
global.RequestDataGenerator = require('./data/RequestDataGenerator.js');

// Utilities
// global.sleep = require('sleep');
global.moment = require('moment');
global.Promise = require('bluebird');
global.log = require('./api/utils/test-logger.js');
global.testConfig = require('./config/test-config.js');
global._ = require('lodash');
