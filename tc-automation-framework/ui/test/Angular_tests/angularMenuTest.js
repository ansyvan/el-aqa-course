require('../../utils/test-reporter-setup');
const MenuPage = require('../../pages/AngularApp/MenuPage');

describe('Angular context menu custom script', () => {

    before(async() => {
        await MenuPage.openAngularMenuPage();
        await MenuPage.basicMenuButton.waitForDisplayed();
    });

    it('Should open Basic Menu using custom script click', async() => {
        expect(await MenuPage.firstMenuItem.isDisplayed()).to.be.false;

        await MenuPage.openMenuWithCustomScript();
        await MenuPage.firstMenuItem.waitForDisplayed();

        expect(await MenuPage.firstMenuItem.isDisplayed()).to.be.true;
    });
});
