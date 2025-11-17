require('../../utils/test-reporter-setup');
const BreedsPage = require('../../pages/DogApp/BreedsPage');
const CompareImagesHelper = require('../../utils/compareImagesHelper');

describe('Get random dog image by breed', () => {

    const imgTag = 'dog-breed-image';

    before(async() => {
        await BreedsPage.openBreedsListPage();
        await BreedsPage.isOpened();
        await browserUtils.enableRequestInterceptor();
    });

    it('Should have "pug" in the dropdown', async() => {
        expect(await BreedsPage.breedOption('akita').isExisting()).to.be.true;
    });

    it('Should fetch a random "pug" image', async() => {
        await BreedsPage.fetchRandomDogByBreed('pug');
        await BreedsPage.imageResult.waitForDisplayed();
        expect(await BreedsPage.imageResult.isDisplayed()).to.be.true;
    });

    it('Should perform image comparison', async() => {
        const dogImage = BreedsPage.imageResult;

        await CompareImagesHelper.saveElement(dogImage, imgTag);
        const res = await CompareImagesHelper.compareImages(dogImage, imgTag, 0.1,
            {ignoreColors: false});
        expect(res).to.be.true;
    });
});
