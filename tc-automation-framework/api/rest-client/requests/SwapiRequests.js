const testConfig = require('../../../config/test-config');
const TestEndPoints = require('../TestEndPoints');
const log = require('../../utils/test-logger');
log.level = testConfig.LOG_LEVEL || 'info';
const {client} = require('../RestClient');

class SwapiRequests {

    static getStarShipById(starShipId) {
        log.info('Getting starship by id');
        return client.get(TestEndPoints.getStarShipByIdEndPoint(starShipId),
            {headers: {Custom: 'Hello world!'}}
        );
    }

    static getPersonById(personId) {
        log.info('Getting person by id');
        return client.get(TestEndPoints.getPersonByIdEndPoint(personId));
    }

    static getPlanetById(planetId) {
        log.info('Getting planet by id');
        return client.get(TestEndPoints.getPlanetByIdEndPoint(planetId));
    }

    static getFilmById(filmId) {
        log.info('Getting film by id');
        return client.get(TestEndPoints.getFilmByIdEndPoint(filmId));
    }

    static getPersonByName(personName) {
        log.info('Getting person by name');
        return client.get(TestEndPoints.getPersonByNameEndPoint(personName));
    }

    static getStarShipByName(starShipName) {
        log.info('Getting starship by name');
        return client.get(TestEndPoints.getStarShipByNameEndPoint(starShipName));
    }

    static getFilmByName(filmName) {
        log.info('Getting film by name');
        return client.get(TestEndPoints.getFilmByNameEndPoint(filmName));
    }

    static getVehicleByName(vehicleName) {
        log.info('Getting vehicle by name');
        return client.get(TestEndPoints.getVehicleByNameEndPoint(vehicleName));
    }

    static getResourceByUrl(fullUrl) {
        log.info(`Requesting resource from full URL: ${fullUrl}`);
        const endpoint = TestEndPoints.getEndpointFromFullUrl(fullUrl);
        return client.get(endpoint);
    }

    static getRootResources() {
        log.info('Getting all resources from root endpoint');
        return client.get(TestEndPoints.getRootEndPoint());
    }

    static getResource(resourceName) {
        log.info('Getting resource');
        return client.get(TestEndPoints.getResourceEndpoint(resourceName));
    }

    static async getAllStarships() {
        log.info('Getting all starships');
        let allResults = [];
        let nextPageURL = TestEndPoints.getAllStarshipsEndPoint();

        while (nextPageURL) {
            log.info(`Fetching starships from: ${nextPageURL}`);
            const nextRes = await client.get(nextPageURL);
            allResults = allResults.concat(nextRes.body.results);

            if (nextRes.body.next) {
                nextPageURL = TestEndPoints.getEndpointFromFullUrl(nextRes.body.next);
            } else {
                nextPageURL = null;
            }
        }
        log.info(`Total starships fetched: ${allResults.length}`);
        return allResults;
    }
}

module.exports = SwapiRequests;
