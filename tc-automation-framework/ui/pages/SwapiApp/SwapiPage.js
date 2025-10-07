
const testConfig = require('../../../config/test-config.js');
const BasePage = require('../BasePage.js');

class SwapiPage extends BasePage {

    get restEndPointNameInput() { return $('input#interactive'); }
    get sendRequestButton() { return $('.btn.btn-primary'); }
    get requestResultField() { return $('#interactive_output'); }

    constructor() {
        super();
    }

    openSwapiApp() {
        return this.navigateTo(testConfig.SWAPI_APP_URL, this.restEndPointNameInput);
    }

    async sendRequestToSwapiEndPoint(endPointName) {
        await this.typeText(this.restEndPointNameInput, endPointName);
        await this.clickOnElement(this.sendRequestButton);
        await browser.pause(3000);
    }

    getResponseText() {
        return this.getElementText(this.requestResultField);
    }
}

module.exports = new SwapiPage();
