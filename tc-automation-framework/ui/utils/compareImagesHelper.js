const fs = require('fs');
const ContentType = require('../../config/test-config').CONTENT_TYPE;

class CompareImagesHelper {
    static deleteOrigins() {
        return glob('../**/ImagesOrigin/*.png', (err, files) => {
            if (err) {
                log.debug(err);
            } else {
                files.forEach(file => fs.unlink(file));
            }
        });
    }

    static attachDiffImageToReport(imageTag) {
        const fileToUpload = `data/TestsImages/ImagesTests/diff/${imageTag}-${BROWSER_NAME}*.png`;
        return glob(fileToUpload, (err, files) => {
            try {
                if (err)
                    log.debug(err);
                else {
                    const diffImage = fs.readFileSync(files[0]);
                    testReporter.addStep('Image comparison diff artifact');
                    testReporter.addAttachment('Diff', Buffer.from(diffImage, 'base64'), ContentType.PNG);
                    log.debug('Attaching diff image');
                }
            } catch (error) {
                log.debug('Error occured with diff image attachment');
                testReporter.addStep('Image comparison diff artifact error log');
                testReporter.addAttachment('Error', Buffer.from(error.toString(), 'utf8'), ContentType.TEXT);
            }
        });
    }

    static async saveElement(wdioElement, imageTag) {
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        return browser.saveElement(element, imageTag);
    }

    static async compareImages(wdioElement, imgTag, threshold, {blockOut, ignoreColors = false} = {}) {
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        let percentage;
        if (blockOut) {
            percentage = await browser.checkElement(element, imgTag,
                {blockOut: blockOut, saveAboveTolerance: threshold, ignoreColors: ignoreColors});
        } else {
            percentage = await browser.checkElement(element, imgTag,
                {saveAboveTolerance: threshold, ignoreColors: ignoreColors});
        }
        return new Promise((resolve) => {
            (percentage < threshold) ? resolve(true) : resolve(false);
        });
    }
}

module.exports = CompareImagesHelper;
