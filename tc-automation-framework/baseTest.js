
const dotenv = require('dotenv');
dotenv.config();

const chai = require('chai');
const chaiHttp = require('chai-http');
const itParam = require('mocha-param');
const SwapiRequests = require('./api/rest-client/requests/SwapiRequests');
const RequestDataGenerator = require('./data/RequestDataGenerator');
const sleep = require('sleep');
const moment = require('moment');
const Promise = require('bluebird');
const log = require('./api/utils/test-logger');
const testConfig = require('./config/test-config');
const _ = require('lodash');
const mongodb = require('mongodb');
const { ObjectId } = mongodb;

chai.use(chaiHttp);
chai.config.includeStack = true;

// This file sets up global variables, making these tools available in all
// test files without needing to import them everywhere.
global.chai = chai;
global.expect = chai.expect;
global.itParam = itParam;
global.SwapiRequests = SwapiRequests;
global.RequestDataGenerator = RequestDataGenerator;
global.sleep = sleep;
global.moment = moment;
global.Promise = Promise;
global.log = log;
global.testConfig = testConfig;
global._ = _;
global.ObjectId = ObjectId;
