const testConfig = require('../../../config/test-config');
const BasePage = require('../BasePage');
const RegistrationPage = require('./RegistrationPage');

class ConduitHomePage extends BasePage {

    get siteHeader() { return $('[data-qa-id="site-header"]'); }
    get homePage() { return $('.home-page'); }
    get signUpButton() { return $('.nav-link[href="/register"]'); }

    constructor() {
        super();
    }

    openConduitApp() {
        return this.navigateTo(testConfig.CONDUIT_APP_URL, this.homePage);
    }

    async clickSignUpButton() {
        await this.clickOnElement(this.signUpButton);
        await this.waitForElementVisible(RegistrationPage.root);
        return RegistrationPage;
    }
}

module.exports = new ConduitHomePage();
