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
        expect(await BreedsPage.breedOption('pug').isExisting()).to.be.true;
    });

    it('Should fetch the first random "pug" image', async() => {
        await BreedsPage.fetchRandomDogByBreed('pug');
        await BreedsPage.imageResult.waitForDisplayed();
        await browser.waitUntil(async() => {
            return (await BreedsPage.imageResult.getProperty('complete')) === true;
        }, { timeout: 5000, timeoutMsg: 'Image not loaded completely' });
        
        CompareImagesHelper.deleteOrigins(imgTag);

        await CompareImagesHelper.compareImages(
            BreedsPage.imageResult,
            imgTag,
            0.1,
            {
                ignoreColors: false
            }
        );
    });

    it('Should fetch the second random "pug" image and compare them', async() => {
        await BreedsPage.fetchRandomDogByBreed('pug');

        const res = await CompareImagesHelper.compareImages(
            BreedsPage.imageResult,
            imgTag,
            0.1,
            {
                ignoreColors: false,
                autoSaveBaseline: false
            });
            
        expect(res).to.be.false;
    });

    after(async function() {
        await browserUtils.logInterceptedRequests();
    });

    afterEach(async function() {
        if (this.currentTest.state === 'failed') {
            CompareImagesHelper.attachDiffImageToReport(imgTag);
        }
    });
});
