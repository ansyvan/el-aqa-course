class WdioBrowserUtils {

    static getCurrentUrl() {
        log.debug('Getting current url');
        return browser.getUrl();
    }

    static addCookie({cookieName, value} = {}) {
        return browser.setCookies({name: cookieName, value: encodeURIComponent(value)});
    }

    static async setAuthTokenInLocalStorage(token) {
        log.debug('Setting auth token in local storage');
        await browser.execute(function(authToken) {
            window.localStorage.setItem('id_token', authToken);
        }, token);
    }

    static refreshPage() {
        log.debug('Syncing the page');
        return browser.refresh();
    }

    static async clearAllCookies() {
        log.debug('Clearing all cookies');
        await browser.deleteCookies();
    }

    static switchToNextTab() {
        return browser.getWindowHandles().then(function(handles) {
            const newWindowHandle = handles[1];
            return browser.switchToWindow(newWindowHandle);
        });
    }

    static switchToTab(tabIndex) {
        return browser.getWindowHandles().then(function(handles) {
            const newWindowHandle = handles[tabIndex];
            return browser.switchToWindow(newWindowHandle);
        });
    }

    static async closeUnusedTab() {
        const currentHandle = await browser.getWindowHandle();
        return browser.getWindowHandles().then(async(handles) => {
            for (let i = 0; i < handles.length; i++) {
                if (handles[i] !== currentHandle) {
                    await browser.switchToWindow(handles[i]);
                    await browser.closeWindow();
                }
            }
            return browser.switchToWindow(currentHandle);
        });
    }

    static navigateToPreviousPage() {
        return browser.back();
    }

    static enableRequestInterceptor() {
        return browser.setupInterceptor();
    }

    static async getSlugFromUrl() {
        log.debug('Getting slug from current URL');
        const url = await browser.getUrl();
        if (!url.includes('/articles/')) {
            return null;
        }
        return url.split('/articles/').pop().replace(/\/$/, '');
    }
}

module.exports = WdioBrowserUtils;
