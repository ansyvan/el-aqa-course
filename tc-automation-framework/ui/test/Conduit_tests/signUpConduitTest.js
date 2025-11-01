require('../../utils/test-reporter-setup');
const { expect } = require('chai');
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
            password: 'Password123!'
        };
        log.info('Generated user data for registration:', user);

        await HomePage.openConduitApp();
        expect(await HomePage.root.isDisplayed()).to.be.true;
        await browserUtils.enableRequestInterceptor();
    });

    it('Should register user', async() => {
        await HomePage.confirmNavigationForLoggedOutUser();
        await HomePage.navigateToRegistrationPage();
        expect(RegistrationPage.root).to.exist;
        expect(await RegistrationPage.title).to.exist;

        await RegistrationPage.registerUser(user.username, user.email, user.password);
        expect(await HomePage.root.isDisplayed()).to.be.true;
        await HomePage.confirmNavigationForLoggedInUser(user.username);
    });
});
