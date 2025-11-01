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

    it('Should register user', async() => {
        await HomePage.confirmNavigationForLoggedOutUser();
        await HomePage.navigateToRegistrationPage();

        await RegistrationPage.registerUser(user.username, user.email, user.password);
        await HomePage.isOpened();
        await HomePage.confirmNavigationForLoggedInUser(user.username);
    });
});
