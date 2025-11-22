const BasePage = require('../BasePage');

class BreedsPage extends BasePage {

    get root() { return $('.api-side'); }
    get title() { return this.root.$('h3=Breeds list'); }
    get dogSelectorDropdown() {return $('select.dog-selector'); }
    breedOption(value) { return $(`option[value=${value}]`); }
    get fetchButton() { return $('.get-dog'); }
    get imageResult() { return $('.demo-image img'); }

    constructor() {
        super();
    }

    openBreedsListPage() {
        const url = new URL('dog-api/breeds-list', testConfig.DOG_APP_URL);
        return this.navigateTo(url.href, this.root);
    }

    async isOpened() {
        expect(await this.root.isDisplayed()).to.be.true;
    }

    async fetchRandomDogByBreed(breed) {
        await this.dogSelectorDropdown.waitForExist();
        
        const oldSrc = await this.imageResult.getAttribute('src');

        await this.dogSelectorDropdown.selectByAttribute('value', breed);
        await this.fetchButton.click();

        await browser.waitUntil(
            async() => (await this.imageResult.getAttribute('src')) !== oldSrc,
            {
                timeout: 5000,
                timeoutMsg: 'Image source did not update after clicking Fetch'
            }
        );

        await browser.waitUntil(
            async() => (await this.imageResult.getProperty('naturalWidth')) > 0,
            {
                timeout: 5000,
                timeoutMsg: 'Image finished loading but width is 0'
            }
        );
    }
}

module.exports = new BreedsPage();
