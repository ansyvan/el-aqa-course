// The next line should be added to the all e2e scenarios
// It helps to create an Allure report
require('../../utils/test-reporter-setup');
const SwapiPage = require('../../pages/SwapiApp/SwapiPage');
const [endPointName, starShipName] = ['starships/5/', 'Sentinel-class landing craft'];

describe('Send Swapi request using "Try it out" functionality', () => {
    before(async() => {
        await SwapiPage.openSwapiApp();
        await browserUtils.enableRequestInterceptor();
    });

    it('Should send a request using "Try it out" functionality', async() => {
        await SwapiPage.sendRequestToSwapiEndPoint(endPointName);
        const responseText = await SwapiPage.getResponseText();
        expect(responseText.indexOf(starShipName)).to.not.equal(-1);
    });
});
