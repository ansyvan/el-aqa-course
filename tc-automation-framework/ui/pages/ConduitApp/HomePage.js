const { expect } = require('chai');
const testConfig = require('../../../config/test-config');
const BasePage = require('../BasePage');
const RegistrationPage = require('./RegistrationPage');
const SignInPage = require('./SignInPage');

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
    get tableOfContents() { return $('.container page'); }

    constructor() {
        super();
    }

    openConduitApp() {
        return this.navigateTo(testConfig.CONDUIT_APP_URL, this.homePage);
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
}

module.exports = new HomePage();
