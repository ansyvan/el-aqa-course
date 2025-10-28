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

    static async getRandomDogImage() {
        log.info('Getting random dog image');
        return client.get(TestEndPoints.getRandomDogImageEndPoint());
    }

    static async getAllImagesByBreed(breed) {
        log.info(`Getting all images for breed: ${breed}`);
        return client.get(TestEndPoints.getAllImagesByBreedEndPoint(breed));
    }

    static async getListOfSubBreeds(breed) {
        log.info(`Getting list of sub-breeds for breed: ${breed}`);
        return client.get(TestEndPoints.getListOfSubBreedsEndPoint(breed));
    }
}

module.exports = DogRequests;
