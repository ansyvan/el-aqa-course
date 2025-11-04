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

        updatedArticle = {
            title: article.title + ' Updated',
            description: article.description + ' Updated',
            body: article.body + '\n\nAdditional content added to the body.',
            tags: ['updated']
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
            article.title,
            article.description,
            article.body,
            article.tags
        );
    });

    it('Should verify the created article page is opened', async() => {
        await ArticlePage.isOpened();
        article.slug = await browserUtils.getSlugFromUrl();
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

    it('Should verify the created article appears in the global feed', async() => {
        await HomePage.openConduitApp();
        await HomePage.isOpened();
        await HomePage.isGlobalFeedTabActive();
        await HomePage.isArticleInGlobalFeedVisible(
            user.username,
            article.title,
            article.description
        );
    });

    it('Should navigate to the created article via "Read more" button', async() => {
        await HomePage.clickReadMoreButton(article.title);
        await ArticlePage.isOpened();
    });

    it('Should navigate to the Article edit mode', async() => {
        await ArticlePage.navigateToEditArticlePage();
        await NewArticlePage.isOpened();
    });

    it('Should update the article', async() => {
        await NewArticlePage.addNewArticle(
            updatedArticle.title,
            updatedArticle.description,
            updatedArticle.body,
            updatedArticle.tags
        );
    });

    it('Should verify the updated article page is opened', async() => {
        await ArticlePage.isOpened();
    });

    it('Should verify the updated article title', async() => {
        await ArticlePage.isArticleTitle(updatedArticle.title);
    });

    it('Should verify the updated article body', async() => {
        await ArticlePage.isArticleBody(updatedArticle.body);
    });

    it('Should verify the updated article tags', async() => {
        await ArticlePage.isArticleTagsList(article.tags.concat(updatedArticle.tags));
    });

    it('Should verify the updated article appears in the global feed', async() => {
        await HomePage.openConduitApp();
        await HomePage.isOpened();
        await HomePage.isGlobalFeedTabActive();
        await HomePage.isArticleInGlobalFeedVisible(
            user.username,
            updatedArticle.title,
            updatedArticle.description
        );
    });

    after(async() => {
        if (article.slug && user.token) {
            await conduitApi.deleteArticle(article.slug, user.token);
        }
    });
});
