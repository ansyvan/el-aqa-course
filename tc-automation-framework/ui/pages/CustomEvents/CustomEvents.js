const BasePage = require('../BasePage');

class CustomEvents extends BasePage {

    constructor() {
        super();
    }

    static async changeInputText(elementSelector, value) {
        await browser.execute(function(selector, newValue) {
            document.querySelector(selector).focus();
            document.querySelector(selector).value = newValue;
            document.querySelector(selector).blur();
        }, elementSelector, value);
    }

    static async mouseClick(elementSelector) {
        await browser.execute(function(selector) {
            document.querySelector(selector).click();
        }, elementSelector);
    }
}

module.exports = CustomEvents;
