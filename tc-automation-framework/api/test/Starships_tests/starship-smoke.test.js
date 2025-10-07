const itParam = require('mocha-param');
const { expect } = require('chai');
const SwapiRequests = require('../../rest-client/requests/SwapiRequests');
const log = require('../../utils/test-logger');

describe('SWAPI Root Resource Smoke Tests', () => {
    const resources = [
        'people',
        'planets',
        'films',
        'species',
        'vehicles',
        'starships',
    ];

    itParam(
        'Should verify that each /${value}/ endpoint is reachable',
        resources,
        async(resource) => {
            log.info(`Testing reachability of the '${resource}' resource...`);

            const res = await SwapiRequests.getResource(resource);

            expect(res).to.have.status(200);
        }
    );
});
