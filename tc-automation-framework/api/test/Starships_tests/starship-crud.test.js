const { expect } = require('chai');
const RequestDataGenerator = require('../../../data/RequestDataGenerator');
const SwapiRequests = require('../../rest-client/requests/SwapiRequests');
const log = require('../../utils/test-logger');

describe('Starship CRUD operations', () => {
    before(() => {
        log.info('I am called once before all specs in this file');
    });

    beforeEach(() => {
        log.info('I am called before each spec in this file');
    });

    it('Should get a random existing starship by id', async() => {
        const randomStartShipId = RequestDataGenerator.generateStarshipId();
        const res = await SwapiRequests.getStarShipById(randomStartShipId);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('name');
    });

    it('Should not return a starship with non existing id', async() => {
        const res = await SwapiRequests.getStarShipById(1000000);
        expect(res).to.have.status(404);
        expect(res.body.detail).to.equal('Not found');
    });

    it('Should not return a non-existing person', async() => {
        const firstName = RequestDataGenerator.generateValidUserFirstName();
        const lastName = RequestDataGenerator.generateValidUserLastName();
        const res = await SwapiRequests.getPersonByName(`${firstName} ${lastName}`);
        expect(res).to.have.status(200);
        expect(res.body.count).to.equal(0);
        expect(res.body.results).to.be.an('array').that.is.empty;
    });

    it('Should verify that Luke Skywalker has blue eyes', async() => {
        const res = await SwapiRequests.getPersonByName('Luke Skywalker');
        expect(res).to.have.status(200);
        expect(res.body.results[0].eye_color).to.equal('blue');
    });

    it('Should verify that Darth Vader is from Tatooine', async() => {
        const personSearchResponse = await SwapiRequests.getPersonByName(
            'Darth Vader'
        );
        const homeworldUrl = personSearchResponse.body.results[0].homeworld;
        const homeworldResponse = await SwapiRequests.getResourceByUrl(
            homeworldUrl
        );
        expect(personSearchResponse.body.results[0].name).to.equal('Darth Vader');
        expect(homeworldResponse.body.name).to.equal('Tatooine');
    });

    it('Should verify that Death Star has a crew over 300,000', async() => {
        const res = await SwapiRequests.getStarShipByName('Death Star');
        const crewSize = parseInt(res.body.results[0].crew.replace(/,/g, ''));
        expect(res).to.have.status(200);
        expect(crewSize).to.be.above(300000);
    });

    it('Should verify that R2-D2 has appeared in 6 films', async() => {
        const res = await SwapiRequests.getPersonByName('R2-D2');
        expect(res).to.have.status(200);
        expect(res.body.results[0].films.length).to.equal(6);
    });

    it('Should verify that datatype of planet population field is a string', async() => {
        const randomPlanetId = RequestDataGenerator.generatePlanetId();
        const res = await SwapiRequests.getPlanetById(randomPlanetId);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('population');
        expect(res.body.population).to.be.a('string');
    });

    it('Should verify all starship names are unique', async() => {
        const allStarships = await SwapiRequests.getAllStarships();
        const starshipNames = allStarships.map((starship) => starship.name);
        const uniqueStarshipNames = new Set(starshipNames);
        expect(uniqueStarshipNames.size).to.equal(starshipNames.length);
    });

    it('Should verify that Leia has not appeared in 4th film', async() => {
        const personRes = await SwapiRequests.getPersonByName('Leia Organa');
        const filmRes = await SwapiRequests.getFilmById(4);
        expect(personRes.body.results[0].films).to.not.include(filmRes.body.url);
    });

    it("Should verify that there are no pilots of 'Sand Crawler'", async() => {
        const res = await SwapiRequests.getVehicleByName('Sand Crawler');
        expect(res).to.have.status(200);
        expect(res.body.results[0].pilots).to.be.an('array').that.is.empty;
    });

    it('Should verify that all resources are reachable from the root endpoint', async() => {
        const res = await SwapiRequests.getRootResources();
        expect(res).to.have.status(200);
        expect(res.body).to.have.all.keys(
            'people',
            'planets',
            'films',
            'species',
            'vehicles',
            'starships'
        );
    });

    afterEach(() => {
        log.info('I am called after each spec in this file');
    });

    after(() => {
        log.info('I am called once after all specs in this file');
    });
});
