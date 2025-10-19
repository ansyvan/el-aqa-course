const testConfig = require('../../../config/test-config');
const TestEndPoints = require('../DogTestEndPoints');
const log = require('../../utils/test-logger');
log.level = testConfig.LOG_LEVEL || 'info';
const {client} = require('../DogRestClient');

class DogRequests {
    static async getAllBreeds() {
        log.info('Getting all breeds');
        return client.get(TestEndPoints.getAllBreedsEndPoint());
    }
}

module.exports = DogRequests;
