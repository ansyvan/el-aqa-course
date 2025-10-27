const RequestDataGenerator = require('../../data/RequestDataGenerator.js');
const peopleCollection = 'people';

class MongoService {
    db;

    constructor(dbObject) {
        if (!dbObject) {
            throw new Error('MongoService requires a valid Db object.');
        }
        this.db = dbObject;
    }

    async createFakePerson() {
        log.info('Generating and inserting fake person into MongoDB...');
        if (!this.db) {
            throw new Error('Database connection is not available in MongoService.');
        }
        try {
            const personData = RequestDataGenerator.generateFakePerson();
            const result = await this.db.collection(peopleCollection).insertOne(personData);
            log.info(`Person ${personData.firstName} ${personData.lastName} inserted with ID: ${result.insertedId}`);
            return { insertedId: result.insertedId, ...personData };
        } catch (error) {
            log.error('Error creating fake person:', error);
            throw error;
        }
    }

    async findPersonByEmail(email) {
        log.info(`Finding person by email: ${email}`);
        if (!this.db) throw new Error('DB not available');
        try {
            const person = await this.db.collection(peopleCollection).findOne({ email: email });
            if (person) log.info(`Found person: ${person.firstName} ${person.lastName}`);
            else log.info(`Person with email ${email} not found.`);
            return person;
        } catch (error) {
            log.error('Error finding person by email:', error);
            throw error;
        }
    }
    
    async updatePersonJobTitle(email, newJobTitle) {
        log.info(`Updating job title for email: ${email} to "${newJobTitle}"`);
        if (!this.db) throw new Error('DB not available');
        try {
            const result = await this.db.collection(peopleCollection).updateOne(
                { email: email },
                { $set: { jobTitle: newJobTitle } }
            );
            log.info(`Matched ${result.matchedCount} and modified ${result.modifiedCount} documents.`);
            return result;
        } catch (error) {
            log.error('Error updating person job title:', error);
            throw error;
        }
    }
    
    async deletePersonByEmail(email) {
        log.info(`Deleting person by email: ${email}`);
        if (!this.db) throw new Error('DB not available');
        try {
            const result = await this.db.collection(peopleCollection).deleteOne({ email: email });
            log.info(`Deleted ${result.deletedCount} documents.`);
            return result;
        } catch (error) {
            log.error('Error deleting person by email:', error);
            throw error;
        }
    }
}

module.exports = MongoService;
