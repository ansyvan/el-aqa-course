require('../../utils/test-reporter-setup');
const conduitApi = require('../../utils/conduitApi');
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
            password: userData.password
        };
        log.info('Generated user data for login:', user);

        await conduitApi.createUser(user);

        await HomePage.openConduitApp();
        await HomePage.isOpened();
        await browserUtils.enableRequestInterceptor();
    });

    it('Should login user', async() => {
        await HomePage.confirmNavigationForLoggedOutUser();
        await HomePage.navigateToSignInPage();

        await SignInPage.loginUser(user.email, user.password);
        await HomePage.isOpened();
        await HomePage.confirmNavigationForLoggedInUser(user.username);
    });
});
