const testConfig = require('../../../config/test-config');
const BasePage = require('../BasePage');

class RegistrationPage extends BasePage {

    get root() { return $('.auth-page'); }
    // get signUpButton() { return $('.nav-link[href="/register"]'); }

    constructor() {
        super();
    }

    registerUser() {
        return this.navigateTo(testConfig.CONDUIT_APP_URL, this.registrationPage);
    }
}

module.exports = new RegistrationPage();
