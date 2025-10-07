
const faker = require('faker');
const _ = require('lodash');

class RequestDataGenerator {

    static generateValidUserFirstName() {
        return faker.name.firstName();
    }

    static generateValidUserLastName() {
        return faker.name.lastName();
    }

    static generateValidUrl() {
        return faker.internet.url();
    }

    static generateStarshipId() {
        return _.sample([2, 3, 5, 9]);
    }

    static generatePlanetId() {
        return _.sample([2, 3, 5, 9]);
    }
}

module.exports = RequestDataGenerator;
