require('../../utils/test-reporter-setup');
const { expect } = require('chai');
const HomePage = require('../../pages/ConduitApp/HomePage');
const RegistrationPage = require('../../pages/ConduitApp/ConduitRegistrationPage');

describe('Sign up Conduit', () => {
    before(async() => {
        await HomePage.openConduitApp();
        await browserUtils.enableRequestInterceptor();
    });

    it('Should navigate to Registration page', async() => {
        expect(await HomePage.siteHeader.isDisplayed()).to.be.true;
        await HomePage.clickSignUpButton();
        expect(RegistrationPage.usernameInput).to.exist;
    });
});
