require('../../utils/test-reporter-setup');
const BreedsPage = require('../../pages/DogApp/BreedsPage');

describe('Get random dog image by breed', () => {

    before(async() => {
        await BreedsPage.openBreedsListPage();
        await BreedsPage.isOpened();
        await browserUtils.enableRequestInterceptor();
    });

    it('Should have "pug" in the dropdown', async() => {
        expect(await BreedsPage.breedOption('akita').isExisting()).to.be.true;
    });

    it('Should fetch random dog image for "pug" breed', async() => {
        await BreedsPage.fetchRandomDogByBreed('pug');
        expect(await browserUtils.getLastResponseUrl()).to.include('/breed/pug/images/random');
    });
});
