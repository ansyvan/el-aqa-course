const { expect } = require('chai');
const MongoService = require('../utils/mongoService.js');
const { connectDb, closeDb } = require('../utils/mongoConnection.js');
const RequestDataGenerator = require('../../data/RequestDataGenerator.js');

describe('MongoDB CRUD Operations', () => {
    let db;
    let mongoService;
    let createdPerson;
  
    before(async() => {
        db = await connectDb();
        log.info('Database connection established for tests.');
        mongoService = new MongoService(db);

        createdPerson = await mongoService.createFakePerson();
        expect(createdPerson.email).to.be.a('string', 'Created person should have an email');
    });
  
    after(async() => {
        if (createdPerson && createdPerson.email) {
            await mongoService.deletePersonByEmail(createdPerson.email);
            log.info(`Cleaned up test person with email: ${createdPerson.email}`);
        }
        await closeDb();
        log.info('Database connection closed after tests.');
    });
  
    it('Should find the existing person by email', async() => {
        expect(createdPerson.email, 'Email should exist from before hook').to.exist;
  
        const person = await mongoService.findPersonByEmail(createdPerson.email);
  
        expect(person).to.not.be.null;
        expect(person.email).to.equal(createdPerson.email);
        expect(person.firstName).to.equal(createdPerson.firstName);
        expect(person._id.toString()).to.equal(createdPerson.insertedId.toString());
    });

    it('Should update the existing person\'s job title', async() => {
        expect(createdPerson.jobTitle, 'Job title should exist from before hook').to.exist;
        const person = await mongoService.findPersonByEmail(createdPerson.email);
        expect(person.jobTitle).to.equal(createdPerson.jobTitle);

        const newJobTitle = RequestDataGenerator.generateJobTitle();

        const updatedPersonDocument = await mongoService.updatePersonJobTitle(createdPerson.email, newJobTitle);
        expect(updatedPersonDocument.modifiedCount).to.equal(1);
        
        const updatedPerson = await mongoService.findPersonByEmail(createdPerson.email);
        expect(updatedPerson.jobTitle).to.equal(newJobTitle);
    });

    it('Should delete the existing person by email', async() => {
        expect(createdPerson.email, 'Email should exist from before hook').to.exist;
  
        const deletedPersonDocument = await mongoService.deletePersonByEmail(createdPerson.email);
        expect(deletedPersonDocument.deletedCount).to.equal(1);
  
        const deletedPerson = await mongoService.findPersonByEmail(createdPerson.email);
        expect(deletedPerson).to.be.null;
    });
});
