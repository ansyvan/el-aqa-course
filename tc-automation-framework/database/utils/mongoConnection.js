const { MongoClient } = require('mongodb');
const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DB_NAME || 'fakePeopleDb';

class MongoConnection {
    constructor() {
        this.client = null;
        this.db = null;
    }

    async connect() {
        if (this.db) {
            log.info('MongoDB connection already established.');
            return this.db;
        }
        try {
            log.info(`Connecting to MongoDB at ${url}...`);
            this.client = new MongoClient(url);
            await this.client.connect();
            log.info('MongoDB connection established successfully.');
            this.db = this.client.db(dbName);
            return this.db;
        } catch (error) {
            log.error('Failed to connect to MongoDB:', error);
            throw error;
        }
    }

    getDb() {
        if (!this.db) {
            log.error('Database not initialized. Call connect() first.');
            throw new Error('Database not initialized.');
        }
        return this.db;
    }

    async close() {
        if (this.client) {
            log.info('Closing MongoDB connection...');
            await this.client.close();
            this.client = null;
            this.db = null;
            log.info('MongoDB connection closed.');
        }
    }
}

const mongoDatabase = new MongoConnection();

module.exports = {
    connectDb: () => mongoDatabase.connect(),
    getDb: () => mongoDatabase.getDb(),
    closeDb: () => mongoDatabase.close()
};
