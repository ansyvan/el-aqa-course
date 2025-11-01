const BasePage = require('../BasePage');

class RegistrationPage extends BasePage {

    get root() { return $('.auth-page'); }
    get title() { return this.root.$('h1=Sign up'); }
    get usernameInput() { return $('input[placeholder="Username"]'); }
    get emailInput() {return $('input[placeholder="Email"]'); }
    get passwordInput() { return $('input[placeholder="Password"]'); }
    get signUpButton() { return $('button=Sign up'); }

    constructor() {
        super();
    }

    async registerUser(username, email, password) {
        await this.usernameInput.setValue(username);
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.clickOnElement(this.signUpButton);
    }
}

module.exports = new RegistrationPage();
