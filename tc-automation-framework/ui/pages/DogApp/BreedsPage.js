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
        await this.dogSelectorDropdown.selectByAttribute('value', breed);
        await this.fetchButton.click();
    }
}

module.exports = new BreedsPage();
