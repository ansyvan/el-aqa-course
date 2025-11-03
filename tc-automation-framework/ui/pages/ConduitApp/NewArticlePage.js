const BasePage = require('../BasePage');

class NewArticlePage extends BasePage {

    get root() { return $('.editor-page'); }
    get articleTitleInput() { return $('[data-qa-id="editor-title"]'); }
    get articleDescriptionInput() { return $('[data-qa-id="editor-description"]'); }
    get articleBodyInput() { return $('[data-qa-id="editor-body"] textarea'); }
    get articleTagsInput() { return $('[data-qa-id="editor-tags"]'); }
    get publishArticleButton() { return $('[data-qa-id="editor-publish"]'); }

    constructor() {
        super();
    }

    async addNewArticle(title, description, body, tagsArray) {
        await this.articleTitleInput.setValue(title);
        await this.articleDescriptionInput.setValue(description);
        await this.articleBodyInput.setValue(body);
        for (const tag of tagsArray) {
            await this.articleTagsInput.setValue(tag);
            await browser.keys('Enter');
        }
        await this.clickOnElement(this.publishArticleButton);
    }
}

module.exports = new NewArticlePage();
