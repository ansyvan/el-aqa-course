const BasePage = require('../BasePage');

class ArticlePage extends BasePage {

    get root() { return $('.article-page'); }
    get articleTitle() { return $('[data-qa-id="article-title"]'); }
    get articleBody() { return $('[data-qa-id="article-body"]'); }
    get articleAuthor() { return $('[data-qa-type="author-name"]'); }
    get articleTags() { return $$('[data-qa-type="article-tag"] a'); }

    constructor() {
        super();
    }

    async isOpened() {
        expect(await this.root.isDisplayed()).to.be.true;
    }

    async isArticleTitle(title) {
        const articleTitleText = await this.articleTitle.getText();
        expect(articleTitleText).to.equal(title);
    }

    async isArticleBody(body) {
        const articleBodyText = await this.articleBody.getText();
        expect(articleBodyText).to.equal(body);
    }

    async isArticleAuthor(author) {
        const articleAuthorText = await this.articleAuthor.getText();
        expect(articleAuthorText).to.equal(author);
    }

    async isArticleTagsList(tagsArray) {
        const actualTags = [];
        for (const tagElement of await this.articleTags) {
            const text = await tagElement.getText();
            actualTags.push(text.trim());
        }
        expect(actualTags).to.have.members(tagsArray)
            .and.to.have.lengthOf(tagsArray.length);
    }
}

module.exports = new ArticlePage();
