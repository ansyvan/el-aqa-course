const BasePage = require('../BasePage');
const CustomEvents = require('../CustomEvents/CustomEvents');

class MenuPage extends BasePage {
    
    get basicMenuButton() { return $('menu-overview-example button'); }
    get firstMenuItem() { return $('button[role="menuitem"]'); }

    constructor() {
        super();
    }

    async openAngularMenuPage() {
        await this.navigateTo('https://material.angular.io/components/menu/overview', this.basicMenuButton);
    }

    async openMenuWithCustomScript() {
        await this.basicMenuButton.waitForExist();
        await CustomEvents.mouseClick('menu-overview-example button');
    }
}

module.exports = new MenuPage();
