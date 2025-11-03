require('../../utils/test-reporter-setup');
const conduitApi = require('../../utils/conduitApi');
const HomePage = require('../../pages/ConduitApp/HomePage');
const NewArticlePage = require('../../pages/ConduitApp/NewArticlePage');
const ArticlePage = require('../../pages/ConduitApp/ArticlePage');
const User = require('../../../data/RequestDataGenerator');

describe('New Article CRUD', () => {
    let user;
    let articleData;

    before(async() => {
        const userData = User.generateFakePerson();
        user = {
            username: userData.username.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(),
            email: userData.email.toLowerCase(),
            password: userData.password
        };
        log.info('Generated user data for login:', user);

        await conduitApi.createUser(user);

        const loginResponse = await conduitApi.loginUser(user.email, user.password);
        user.token = loginResponse.user.token;

        await HomePage.openConduitApp();
        await browserUtils.setAuthTokenInLocalStorage(user.token);
        await browser.refresh();
        await HomePage.isOpened();
        await browserUtils.enableRequestInterceptor();

        articleData = {
            title: 'Automation Article Title',
            description: 'Article Description created by auto-test',
            body: 'This is the body of the test article created by auto-test.',
            tags: ['test', 'aqa', 'mocha']
        };
    });

    it('Should verify navigation bar in header is visible as for logged in user', async() => {
        await HomePage.confirmNavigationForLoggedInUser(user.username);
    });

    it('Should navigate to New Article page', async() => {
        await HomePage.navigateToNewArticlePage();
    });

    it('Should create a new article', async() => {
        await NewArticlePage.addNewArticle(
            articleData.title,
            articleData.description,
            articleData.body,
            articleData.tags
        );
    });

    it('Should verify the created article page is opened', async() => {
        await ArticlePage.isOpened();
        const url = await browser.getUrl();
        articleData.slug = url.split('/articles/').pop();
        log.info(`Article created with slug: ${articleData.slug}`);
    });

    it('Should verify the created article title', async() => {
        const articleTitle = await ArticlePage.articleTitle.getText();
        expect(articleTitle).to.equal(articleData.title);
    });

    it('Should verify the created article body', async() => {
        const articleBody = await ArticlePage.articleBody.getText();
        expect(articleBody).to.equal(articleData.body);
    });

    it('Should verify the created article author', async() => {
        const articleAuthor = await ArticlePage.articleAuthor.getText();
        expect(articleAuthor).to.equal(user.username);
    });

    it('Should verify the created article tags', async() => {
        await ArticlePage.isArticleTagsList(articleData.tags);
    });

    after(async() => {
        if (articleData.slug && user.token) {
            await conduitApi.deleteArticle(articleData.slug, user.token);
        }
    });
});
