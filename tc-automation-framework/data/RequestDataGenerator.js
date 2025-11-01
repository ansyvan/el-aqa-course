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

    static generateFakePerson() {
        const person = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            gender: faker.name.gender(),
            birthDate: faker.date.past(70, new Date('2007-01-01')),
            address: {
                street: faker.address.streetAddress(),
                city: faker.address.city(),
                zipCode: faker.address.zipCode(),
                country: faker.address.country()
            },
            phone: faker.phone.phoneNumber(),
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password: faker.internet.password(),
            jobTitle: faker.name.jobTitle(),
            company: faker.company.companyName()
        };
        return person;
    }

    static generateJobTitle() {
        return faker.name.jobTitle();
    }
}

module.exports = RequestDataGenerator;
