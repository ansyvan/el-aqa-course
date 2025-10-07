
const SwapiPage = require('../pages/SwapiPage.js');
const browserUtils = require('../utils/wdioBrowserUtils.js');
const { expect } = require('chai');

// This line is often used to set up reporting tools like Allure
// require('../../utils/test-reporter-setup.js'); // Assuming this file exists and is CommonJS

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
