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

    it('Should verify navigation bar in header is visible as for logged out user', async() => {
        await HomePage.confirmNavigationForLoggedOutUser();
    });

    it('Should navigate to Sign In page', async() => {
        await HomePage.navigateToSignInPage();
    });

    it('Should sign in existing user', async() => {
        await SignInPage.loginUser(user.email, user.password);
    });

    it('Should verify user is redirected to Home page after sign in', async() => {
        await HomePage.isOpened();
    });

    it('Should verify navigation bar in header is visible as for logged in user', async() => {
        await HomePage.confirmNavigationForLoggedInUser(user.username);
    });
});
