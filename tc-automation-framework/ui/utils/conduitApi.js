const axios = require('axios');
const API_URL = 'https://conduit-api.learnwebdriverio.com/api';

async function createUser(user) {
    log.info(`[API] Create user: ${user.username}`);
    try {
        const response = await axios.post(`${API_URL}/users`, {
            user: {
                username: user.username,
                email: user.email,
                password: user.password
            }
        });
        log.info(`[API] User ${user.username} created.`);
        return response.data;
    } catch (err) {
        if (err.response) {
            log.info('error', 'Failed to create user (Server error):', err.response.data);
        } else {
            log.info('error', 'Failed to create user (No response from Server):', err.message);
        }
        throw new Error('Failed to create user beforehand');
    }
}

module.exports = {
    createUser
};
