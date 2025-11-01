require('../../utils/test-reporter-setup');
const { expect } = require('chai');
const axios = require('axios');
const HomePage = require('../../pages/ConduitApp/HomePage');
const SignInPage = require('../../pages/ConduitApp/SignInPage');
const User = require('../../../data/RequestDataGenerator');

describe('Sign in Conduit', () => {
    let user;

    before(async() => {
        const userData = User.generateFakePerson();
        user = {
            username: userData.username.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(),
            email: userData.email.toLowerCase(),
            password: 'Password123!'
        };
        log.info('Generated user data for login:', user);

        try {
            await axios.post('https://conduit-api.learnwebdriverio.com/api/users', {
                user: {
                    username: user.username,
                    email: user.email,
                    password: user.password
                }
            });
            log.info(`User ${user.username} created.`);
        } catch (err) {
            if (err.response) {
                log.info('error', 'Failed to create user (Server error):', err.response.data);
            } else {
                log.info('error', 'Failed to create user (No response from Server):', err.message);
            }
            throw new Error('Failed to create user beforehand');
        }

        await HomePage.openConduitApp();
        expect(await HomePage.root.isDisplayed()).to.be.true;
        await browserUtils.enableRequestInterceptor();
    });

    it('Should login user', async() => {
        await HomePage.confirmNavigationForLoggedOutUser();
        await HomePage.navigateToSignInPage();
        expect(SignInPage.root).to.exist;
        expect(await SignInPage.title).to.exist;

        await SignInPage.loginUser(user.email, user.password);
        expect(await HomePage.root.isDisplayed()).to.be.true;
        await HomePage.confirmNavigationForLoggedInUser(user.username);
    });
});
