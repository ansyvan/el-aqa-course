require('../../utils/test-reporter-setup');
const conduitApi = require('../../utils/conduitApi');
const HomePage = require('../../pages/ConduitApp/HomePage');
const NewArticlePage = require('../../pages/ConduitApp/NewArticlePage');
const ArticlePage = require('../../pages/ConduitApp/ArticlePage');
const User = require('../../../data/RequestDataGenerator');
const Article = require('../../../data/RequestDataGenerator');

describe('New Article CRUD', () => {
    let user;
    let article;

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

        const articleData = Article.generateFakeArticle();
        article = {
            title: articleData.title,
            description: articleData.description,
            body: articleData.body,
            tags: articleData.tags
        };
        log.info('Generated article data for creation:', article);
    });

    it('Should verify navigation bar in header is visible as for logged in user', async() => {
        await HomePage.confirmNavigationForLoggedInUser(user.username);
    });

    it('Should navigate to New Article page', async() => {
        await HomePage.navigateToNewArticlePage();
    });

    it('Should create a new article', async() => {
        await NewArticlePage.addNewArticle(
            article.title,
            article.description,
            article.body,
            article.tags
        );
    });

    it('Should verify the created article page is opened', async() => {
        await ArticlePage.isOpened();
        const url = await browser.getUrl();
        article.slug = url.split('/articles/').pop();
        log.info(`Article created with slug: ${article.slug}`);
    });

    it('Should verify the created article title', async() => {
        await ArticlePage.isArticleTitle(article.title);
    });

    it('Should verify the created article body', async() => {
        await ArticlePage.isArticleBody(article.body);
    });

    it('Should verify the created article author', async() => {
        await ArticlePage.isArticleAuthor(user.username);
    });

    it('Should verify the created article tags', async() => {
        await ArticlePage.isArticleTagsList(article.tags);
    });

    after(async() => {
        if (article.slug && user.token) {
            await conduitApi.deleteArticle(article.slug, user.token);
        }
    });
});
