const testConfig = require('../../../config/test-config');
const BasePage = require('../BasePage');

class ConduitPage extends BasePage {

    get siteHeader() { return $('[data-qa-id="site-header"]'); }
    get homePage() { return $('.home-page'); }

    constructor() {
        super();
    }

    openConduitApp() {
        return this.navigateTo(testConfig.CONDUIT_APP_URL, this.siteHeader);
    }
}

module.exports = new ConduitPage();
