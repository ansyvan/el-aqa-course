const { expect } = require('chai');
const testConfig = require('../../../config/test-config');
const BasePage = require('../BasePage');
const RegistrationPage = require('./RegistrationPage');
const SignInPage = require('./SignInPage');
const NewArticlePage = require('./NewArticlePage');
const ArticlePage = require('./ArticlePage');

class HomePage extends BasePage {

    get root() { return $('.home-page'); }
    get siteHeader() { return $('[data-qa-id="site-header"]'); }
    get navBar() {return $('[data-qa-id="site-nav"]'); }
    get homeButton() {return this.navBar.$('.site-nav[href="/"]'); }
    get signInButton() { return this.navBar.$('.nav-link[href="/login"]'); }
    get signUpButton() { return this.navBar.$('.nav-link[href="/register"]'); }
    get newArticleButton() {return this.navBar.$('.nav-link[href="/editor"]'); }
    get settingsButton() {return this.navBar.$('.nav-link[href="/settings"]'); }
    userProfileButton(username) {return this.navBar.$(`.nav-link[href^="/@${username}"]`); }
    get tableOfContents() { return $('.container.page'); }
    get feedTabs() {return this.tableOfContents.$('[data-qa-id="feed-tabs"]'); }
    get globalFeedTab() { return this.feedTabs.$('.nav-link[href="/"]'); }
    get articleList() { return $('[data-qa-type="article-list"]'); }
    get articlePreviews() { return $$('[data-qa-type="article-preview"]'); }
    articleItem(articleTitle) {
        return $(`//h1[@data-qa-type="preview-title" and normalize-space(text())="${articleTitle.trim()}"]`);
    }

    constructor() {
        super();
    }

    openConduitApp() {
        return this.navigateTo(testConfig.CONDUIT_APP_URL, this.root);
    }

    async isOpened() {
        expect(await this.root.isDisplayed()).to.be.true;
    }

    async confirmNavigationForLoggedOutUser() {
        await this.waitForElementVisible(this.signInButton);
        await this.waitForElementVisible(this.signUpButton);
    }

    async confirmNavigationForLoggedInUser(username) {
        const profileLink = this.userProfileButton(username);
        
        await this.waitForElementVisible(this.newArticleButton);
        await this.waitForElementVisible(this.settingsButton);
        await this.waitForElementVisible(profileLink);

        expect(await this.signInButton.isDisplayed()).to.be.false;
        expect(await this.signUpButton.isDisplayed()).to.be.false;
    }

    async navigateToRegistrationPage() {
        await this.clickOnElement(this.signUpButton);
        await this.waitForElementVisible(RegistrationPage.root);
        return RegistrationPage;
    }

    async navigateToSignInPage() {
        await this.clickOnElement(this.signInButton);
        await this.waitForElementVisible(SignInPage.root);
        return SignInPage;
    }

    async navigateToNewArticlePage() {
        await this.clickOnElement(this.newArticleButton);
        await this.waitForElementVisible(NewArticlePage.root);
        return NewArticlePage;
    }

    async isGlobalFeedTabActive() {
        expect(await this.globalFeedTab.getAttribute('class')).to.include('active');
    }

    async getArticleData(preview) {
        return Promise.all([
            preview.$('[data-qa-type="author-name"]').getText(),
            preview.$('[data-qa-type="preview-title"]').getText(),
            preview.$('[data-qa-type="preview-description"]').getText()
        ]);
    }

    async isArticleInGlobalFeedVisible(articleAuthor, articleTitle, articleDescription) {
        const articles = await this.articlePreviews;

        for (const article of articles) {
            const [author, title, description] = await this.getArticleData(article);
            
            if (
                author === articleAuthor &&
                title === articleTitle &&
                description === articleDescription
            ) {
                return true;
            }
        }

        return false;
    }

    async clickArticleToReadMore(articleTitle) {
        await this.clickOnElement(this.articleItem(articleTitle));
        await this.waitForElementVisible(ArticlePage.root);
        return ArticlePage;
    }
}

module.exports = new HomePage();
