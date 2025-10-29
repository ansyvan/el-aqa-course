require('../../utils/test-reporter-setup');
const { expect } = require('chai');
const ConduitPage = require('../../pages/ConduitApp/ConduitPage');

describe('Sign up Conduit', () => {
    before(async() => {
        await ConduitPage.openConduitApp();
        await browserUtils.enableRequestInterceptor();
    });

    it('Should confirm Conduit page is open', async() => {
        expect(ConduitPage.siteHeader).to.exist;
        expect(await ConduitPage.homePage.isDisplayed()).to.be.true;
    });
});
