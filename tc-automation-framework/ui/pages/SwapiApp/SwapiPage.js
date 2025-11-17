const testConfig = require('../../../config/test-config');
const BasePage = require('../BasePage');

class SwapiPage extends BasePage {

    get restEndPointNameInput() { return $('input#interactive'); }
    get sendRequestButton() { return $('.btn.btn-primary'); }
    get requestResultField() { return $('#interactive_output'); }
    get header() { return $('.jumbotron'); }

    constructor() {
        super();
    }

    openSwapiApp() {
        return this.navigateTo(testConfig.SWAPI_APP_URL, this.restEndPointNameInput);
    }

    async sendRequestToSwapiEndPoint(endPointName) {
        await this.typeText(this.restEndPointNameInput, endPointName);
        await this.clickOnElement(this.sendRequestButton);
        // This wait is required to complete the request
        // Please use browser.pause only when there are no other ways
        await browser.pause(3000);
    }

    getResponseText() {
        return this.getElementText(this.requestResultField);
    }
}

module.exports = new SwapiPage();
