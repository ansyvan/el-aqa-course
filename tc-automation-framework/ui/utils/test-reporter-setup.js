const { ContentType } = require('allure2-js-commons');
const allureReporter = require('@wdio/allure-reporter').default;
const logProcessor = require('./browserLogsProcessor.js');
const log = require('../api/utils/test-logger.js');

global.testReporter = allureReporter;
beforeEach('', function() {
    for (const key in global.buildInfo)
        testReporter.addEnvironment(key, global.buildInfo[key]);
    const storyName = this.currentTest.file.substring(this.currentTest.file.lastIndexOf('test/') + 5,
        this.currentTest.file.lastIndexOf('/'));
    testReporter.addStory(storyName);
});
afterEach('', async function() {
    try {
        if (this.currentTest.state === 'failed') {
            const title = this.test.parent.suites[0].title + ' ' + this.currentTest.title;
            const browserLogs = await logProcessor.getBrowserLogs(title);
            if (browserLogs && browserLogs !== 'empty') {
                testReporter.addStep('Log artifact');
                testReporter.addAttachment('Browser logs', Buffer.from(browserLogs, 'utf8'), ContentType.TEXT);
                log.debug('Attaching logs');
            }
            const requestsList = await browser.getRequests();
            if (requestsList && requestsList.length > 0) {
                testReporter.addStep('Browser requests artifact');
                const processedRequests = requestsList.map(item => JSON.stringify(item)).join('\n\n\n');
                testReporter.addAttachment('Browser requests', Buffer.from(processedRequests, 'utf8'),
                    ContentType.TEXT);
                log.debug('Attaching browser requests');
            }
            const screenshot = await browser.takeScreenshot();
            testReporter.addStep('Screenshot artifact');
            testReporter.addAttachment('Screenshot', Buffer.from(screenshot, 'base64'), ContentType.PNG);
            log.debug('Attaching screenshot');
        }
    } catch (err) {
        log.error(err);
    }
});
