require('../../utils/test-reporter-setup');
const HomePage = require('../../pages/ConduitApp/HomePage');
const RegistrationPage = require('../../pages/ConduitApp/RegistrationPage');
const User = require('../../../data/RequestDataGenerator');

describe('Sign up Conduit', () => {
    let user;

    before(async() => {
        const userData = User.generateFakePerson();
        user = {
            username: userData.username.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(),
            email: userData.email.toLowerCase(),
            password: userData.password
        };
        log.info('Generated user data for registration:', user);

        await HomePage.openConduitApp();
        await HomePage.isOpened();
        await browserUtils.enableRequestInterceptor();
    });

    it('Should verify navigation bar in header is visible as for logged out user', async() => {
        await HomePage.confirmNavigationForLoggedOutUser();
    });

    it('Should navigate to Registration page', async() => {
        await HomePage.navigateToRegistrationPage();
    });

    it('Should register new user', async() => {
        await RegistrationPage.registerUser(user.username, user.email, user.password);
    });

    it('Should verify user is redirected to Home page after registration', async() => {
        await HomePage.isOpened();
    });

    it('Should verify navigation bar in header is visible as for logged in user', async() => {
        await HomePage.confirmNavigationForLoggedInUser(user.username);
    });
});
