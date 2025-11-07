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
            log.error('Failed to create user (Server error):', err.response.data);
        } else {
            log.error('Failed to create user (No response from Server):', err.message);
        }
        throw new Error('Failed to create user beforehand');
    }
}

async function loginUser(email, password) {
    log.info(`[API] Login user with email: ${email}`);
    try {
        const response = await axios.post(`${API_URL}/users/login`, {
            user: {
                email: email,
                password: password
            }
        });
        log.info(`[API] User with email ${email} logged in.`);
        return response.data;
    } catch (err) {
        if (err.response) {
            log.error('Failed to login user (Server error):', err.response.data);
        } else {
            log.error('Failed to login user (No response from Server):', err.message);
        }
        throw new Error('Failed to login user beforehand');
    }
}

async function deleteArticle(slug, token) {
    if (!slug || !token) {
        log.warn('[API] Failed to delete article: missing slug or token.');
        return;
    }

    try {
        await axios.delete(`${API_URL}/articles/${slug}`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        log.info(`[API] Deleted article with slug: ${slug}.`);
    } catch (err) {
        log.error(`[API] Failed to delete article ${slug}:`, err.response ? err.response.data : err.message);
    }
}

module.exports = {
    createUser,
    loginUser,
    deleteArticle
};
