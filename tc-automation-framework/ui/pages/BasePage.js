const log = require('../../api/utils/test-logger.js');
const _ = require('lodash');
const testConfig = require('../../config/test-config.js');

class BasePage {

    async waitForElementText(wdioElement, text, {
        timeout = testConfig.ELEMENT_VISIBILITY_TIMEOUT,
        maxRetries = testConfig.MAX_WAIT_RETRY
    } = {}) {
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        let currentRetry = 0, error;
        do {
            log.debug(`Current timeout: ${timeout}`);
            log.debug(`Waiting for element: ${element.selector} to contain text ${text}`);
            try {
                await browser.waitUntil(() => {
                    const txt = element.getText();
                    return txt === text;
                }, {timeout});
                return;
            } catch (err) {
                currentRetry++;
                error = err;
            }
        } while (currentRetry < maxRetries);
        throw new Error(`Element ${element.selector} is not containing specified text: ${text}
        after maximum retries (${maxRetries}), Error message: ${error.name.toString()}`);
    }

    async waitForElementVisible(wdioElement, {
        timeout = testConfig.ELEMENT_VISIBILITY_TIMEOUT,
        maxRetries = testConfig.MAX_WAIT_RETRY
    } = {}) {
        const processedElement = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        let currentRetry = 0, error, element;
        do {
            log.debug(`Current timeout: ${timeout}`);
            log.debug('Waiting for element to become visible');
            try {
                element = _.isArray(processedElement) ? processedElement[0] : processedElement;
                await browser.waitUntil(() => element.isDisplayed(), {timeout});
                return;
            } catch (err) {
                currentRetry++;
                error = err;
            }
        } while (currentRetry < maxRetries);
        throw new Error(`Element ${element.selector} is not visible
        after maximum retries (${maxRetries}), Error message: ${error.name.toString()}`);
    }

    async waitForElementInvisible(wdioElement, {
        timeout = testConstants.ELEMENT_INVISIBILITY_TIMEOUT,
        maxRetries = testConfig.MAX_WAIT_RETRY
    } = {}) {
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        let currentRetry = 0, error;
        do {
            log.debug(`Current timeout: ${timeout}`);
            log.debug(`Waiting for element: ${element.selector} to become invisible`);
            try {
                await browser.waitUntil(() => !element.isDisplayed(), {timeout});
                return;
            } catch (err) {
                currentRetry++;
                error = err;
            }
        } while (currentRetry < maxRetries);
        throw new Error(`Element ${element.selector} is still visible
        after maximum retries (${maxRetries}), Error message: ${error.name.toString()}`);
    }

    async waitForElementClickable(wdioElement, {
        timeout = testConfig.ELEMENT_VISIBILITY_TIMEOUT,
        maxRetries = testConfig.MAX_WAIT_RETRY
    } = {}) {
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        let currentRetry = 0, error;
        do {
            log.debug(`Current timeout: ${timeout}`);
            log.debug(`Waiting for element: ${element.selector} to become clickable`);
            try {
                await browser.waitUntil(() => element.isClickable(), {timeout});
                return;
            } catch (err) {
                currentRetry++;
                error = err;
            }
        } while (currentRetry < maxRetries);
        throw new Error(`Element ${element.selector} is not clickable
        after maximum retries (${maxRetries}), Error message: ${error.name.toString()}`);
    }

    async waitForElementAttributeValue(wdioElement, attribute, value, {
        timeout = testConfig.ELEMENT_VISIBILITY_TIMEOUT,
        maxRetries = testConfig.MAX_WAIT_RETRY
    } = {}) {
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        let currentRetry = 0, error;
        do {
            log.debug(`Current timeout: ${timeout}`);
            log.debug(`Waiting for element ${element.selector} attribute to have value`);
            try {
                await browser.waitUntil(() => {
                    return element.getAttribute(attribute) === value;
                }, {timeout});
                return;
            } catch (err) {
                currentRetry++;
                error = err;
            }
        } while (currentRetry < maxRetries);
        throw new Error(`Element ${element.selector} attribute does not have specified value
        after maximum retries (${maxRetries}), Error message: ${error.name.toString()}`);
    }

    async waitForElementPropertyValue(wdioElement, property, value, {
        timeout = testConfig.ELEMENT_VISIBILITY_TIMEOUT,
        maxRetries = testConfig.MAX_WAIT_RETRY
    } = {}) {
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        let currentRetry = 0, error;
        do {
            log.debug(`Current timeout: ${timeout}`);
            log.debug(`Waiting for element ${element.selector} property to have value`);
            try {
                await browser.waitUntil(() => {
                    return element.getProperty(property) === value;
                }, {timeout});
                return;
            } catch (err) {
                currentRetry++;
                error = err;
            }
        } while (currentRetry < maxRetries);
        throw new Error(`Element ${element.selector} property does not have specified value
        after maximum retries (${maxRetries}), Error message: ${error.name.toString()}`);
    }

    async waitForListCountChanged(wdioListElement, expectedCount, {
        timeout = testConfig.ELEMENT_VISIBILITY_TIMEOUT,
        maxRetries = testConfig.MAX_WAIT_RETRY
    } = {}) {
        const list = typeof wdioListElement === 'object' ? await wdioListElement : wdioListElement;
        let currentRetry = 0, elements, error;
        do {
            log.debug(`Current timeout: ${timeout}`);
            log.debug(`Waiting for list ${list.selector} count to have value ${expectedCount} `);
            try {
                elements = await $$(list.selector);
                await browser.waitUntil(() => {
                    return elements.length === expectedCount;
                }, {timeout});
                return;
            } catch (err) {
                currentRetry++;
                error = err;
            }
        } while (currentRetry < maxRetries);
        throw new Error(`List ${list.selector} count does not changed
        after maximum retries (${maxRetries}), Error message: ${error.name.toString()}`);
    }

    async navigateTo(url, wdioElement, {
        timeout = testConfig.ELEMENT_VISIBILITY_TIMEOUT,
        maxRetries = testConfig.MAX_WAIT_RETRY
    } = {}) {
        testReporter.addStep(`Navigating to ${url}`);
        if (wdioElement) {
            const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
            await browser.url(url);
            log.debug(`Navigating to: ${url} and waiting for + ${element.selector}`);
            return this.waitForElementVisible(element, {timeout, maxRetries});
        } else {
            log.debug(`Navigating to: ${url}`);
            return browser.url(url);
        }
    }

    async clickOnElement(wdioElement, {
        timeout = testConfig.ELEMENT_VISIBILITY_TIMEOUT,
        maxRetries = testConfig.MAX_WAIT_RETRY
    } = {}) {
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        testReporter.addStep(`Clicking on element ${element.selector}`);
        await this.waitForElementVisible(element, {timeout, maxRetries});
        log.debug('Clicked on element: ', element.selector);
        return element.click();
    }

    async typeText(wdioElement, text, {
        timeout = testConfig.ELEMENT_VISIBILITY_TIMEOUT,
        maxRetries = testConfig.MAX_WAIT_RETRY
    } = {}) {
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        testReporter.addStep(`Typing into ${element.selector}`);
        await this.waitForElementVisible(element, {timeout, maxRetries});
        log.debug(`Typed text '${text}' into: `, element.selector);
        return element.setValue(text, {translateToUnicode: false});
    }

    async getElementText(wdioElement, {
        timeout = testConfig.ELEMENT_VISIBILITY_TIMEOUT,
        maxRetries = testConfig.MAX_WAIT_RETRY
    } = {}) {
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        testReporter.addStep(`Getting element text ${element.selector}`);
        await this.waitForElementVisible(element, {timeout, maxRetries});
        log.debug('Getting element text: ', element.selector);
        return element.getText();
    }

    async getElementTextContent(wdioElement) {
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        const script = function(selector) {
            return document.querySelectorAll(selector)[0].textContent;
        };
        const text = await browser.execute(script, typeof wdioElement === 'object' ? element.selector : element);
        return text.trim();
    }

    async getElementAttributeValue(wdioElement, attribute, {
        timeout = testConfig.ELEMENT_VISIBILITY_TIMEOUT,
        maxRetries = testConfig.MAX_WAIT_RETRY
    } = {}) {
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        testReporter.addStep(`Getting element ${element.selector} attribute ${attribute} value`);
        await this.waitForElementVisible(element, {timeout, maxRetries});
        log.debug('Getting element attribute value: ', element.selector);
        return element.getAttribute(attribute);
    }

    async getElementPropertyValue(wdioElement, property, {
        timeout = testConfig.ELEMENT_VISIBILITY_TIMEOUT,
        maxRetries = testConfig.MAX_WAIT_RETRY
    } = {}) {
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        testReporter.addStep(`Getting element ${element.selector} property ${property} value`);
        await this.waitForElementVisible(element, {timeout, maxRetries});
        log.debug('Getting element attribute value: ', element.selector);
        return element.getProperty(property);
    }

    async isElementPresent(wdioElement, {
        maxRetries = testConfig.MAX_WAIT_RETRY
    } = {}) {
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        let res;
        for (let i = 0; i < maxRetries; i++) {
            try {
                res = _.isArray(element) ? await element[0].isExisting() : await element.isExisting();
                if (res === true)
                    return res;
            } catch (err) { log.debug(err); }
        }
        return false;
    }

    async getTextAreaValue(wdioElement, {
        timeout = testConfig.ELEMENT_VISIBILITY_TIMEOUT,
        maxRetries = testConfig.MAX_WAIT_RETRY
    } = {}) {
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        testReporter.addStep(`Getting element text area ${element.selector}`);
        await this.waitForElementVisible(element, {timeout, maxRetries});
        log.debug('Getting element text: ', element.selector);
        return element.getProperty('value');
    }

    // Complete list of special keys is available at https://w3c.github.io/webdriver/#keyboard-actions
    async sendSpecialKeyToElement(wdioElement, key) {
        await this.waitForElementVisible(wdioElement);
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        testReporter.addStep(`Sending special key ${key} to ${element.selector}`);
        return element.addValue(key);
    }

    async performRightClick(wdioElement) {
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        return element.click({button: 2});
    }

    async scrollDown(wdioElement) {
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        return element.scrollIntoView();
    }

    /**
     * WARNING! To successfully use this method, please select an element
     * that is visible before and after page refresh
     */
    async refreshBrowserWindow(waitWdioElement, {
        timeout = testConfig.ELEMENT_VISIBILITY_TIMEOUT,
        maxRetries = testConfig.MAX_WAIT_RETRY
    } = {}) {
        const element = typeof waitWdioElement === 'object' ? await waitWdioElement : waitWdioElement;
        const selector = _.isArray(element) ? element[0].selector : element;
        testReporter.addStep('Refreshing page');
        log.debug('Refreshing page');
        await browser.refresh();
        for (let i = 0; i < maxRetries; i++)
            try {
                await browser.waitUntil(() => $(selector).then(el => el.isExisting()), {timeout});
            } catch (err) { log.debug(err); }
        return this;
    }

    addCookie({cookieName, value} = {}) {
        testReporter.addStep('Adding cookie');
        return browser.setCookies({name: cookieName, value: encodeURIComponent(value)});
    }

    async getItemsListLength(wdioList) {
        testReporter.addStep('Getting list length');
        const list = typeof wdioList === 'object' ? await wdioList : wdioList;
        return list.length;
    }
}

module.exports = BasePage;
