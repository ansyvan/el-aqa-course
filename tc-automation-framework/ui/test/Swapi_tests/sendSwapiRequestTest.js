// The next line should be added to the all e2e scenarios
// It helps to create an Allure report
require('../../utils/test-reporter-setup');
const SwapiPage = require('../../pages/SwapiApp/SwapiPage');
const [endPointName, starShipName] = ['starships/5/', 'Sentinel-class landing craft'];
const CustomEvents = require('../../pages/CustomEvents/CustomEvents');
const CompareImagesHelper = require('../../utils/compareImagesHelper');

describe('Send Swapi request using "Try it out" functionality', () => {
    const imgTag = 'website_title';

    before(async() => {
        await SwapiPage.openSwapiApp();
        await browserUtils.enableRequestInterceptor();
    });

    afterEach(function() {
        if (this.currentTest.state === 'failed') {
            CompareImagesHelper.attachDiffImageToReport(imgTag);
        }
    });

    it('Should perform custom script', async() => {
        await SwapiPage.waitForElementVisible($('#interactive'));
        await CustomEvents.changeInputText('#interactive', endPointName);
        await CustomEvents.mouseClick('.btn.btn-primary');
        await browser.pause(3000);
        const responseText = await SwapiPage.getResponseText();
        expect(responseText.indexOf(starShipName)).to.not.equal(-1);
    });

    it('Should perform image comparison', async() => {
        const websiteHeader = SwapiPage.header;
        await CompareImagesHelper.saveElement(websiteHeader, imgTag);
        const res = await CompareImagesHelper.compareImages(websiteHeader, imgTag, 0.1,
            {ignoreColors: false});
        expect(res).to.be.true;
    });

    it('Should send a request using "Try it out" functionality', async() => {
        await SwapiPage.sendRequestToSwapiEndPoint(endPointName);
        const responseText = await SwapiPage.getResponseText();
        expect(responseText.indexOf(starShipName)).to.not.equal(-1);
    });
});
