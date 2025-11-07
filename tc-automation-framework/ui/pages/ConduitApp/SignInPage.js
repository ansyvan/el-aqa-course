const BasePage = require('../BasePage');

class SignInPage extends BasePage {

    get root() { return $('.auth-page'); }
    get title() { return this.root.$('h1=Sign in'); }
    get emailInput() {return $('input[placeholder="Email"]'); }
    get passwordInput() { return $('input[placeholder="Password"]'); }
    get signInButton() { return $('button=Sign in'); }

    constructor() {
        super();
    }

    async loginUser(email, password) {
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.clickOnElement(this.signInButton);
    }
}

module.exports = new SignInPage();
