const fs = require('fs');
const ContentType = require('../../config/test-config').CONTENT_TYPE;
const glob = require('glob');

class CompareImagesHelper {
    static deleteOrigins(imageTag) {

        if (!imageTag) {
            log.warn('[Helper] deleteOrigins called without tag! Deletion cancelled for safety.');
            return;
        }

        const filePattern = `data/TestsImages/ImagesOrigin/**/*${imageTag}-${global.BROWSER_NAME}*.png`;

        log.debug(`[Helper] Searching for files to delete with pattern: ${filePattern}`);

        try {
            const files = glob.sync(filePattern);
            
            if (files.length > 0) {
                files.forEach(file => {
                    fs.unlinkSync(file);
                    log.info(`[Helper] Deleted file: ${file}`);
                });
            } else {
                log.debug(`[Helper] Files to delete not found for tag: ${imageTag}`);
            }
        } catch (err) {
            log.error(`[Helper] Error deleting files: ${err}`);
        }
    }

    static attachDiffImageToReport(imageTag) {
        const filePattern =
        `data/TestsImages/ImagesTests/diff/desktop_${global.BROWSER_NAME}/${imageTag}-${global.BROWSER_NAME}*.png`;

        try {
            const files = glob.sync(filePattern);

            if (files.length > 0) {
                const diffImage = fs.readFileSync(files[0]);
                testReporter.addStep('Image comparison diff artifact');
                testReporter.addAttachment(
                    'Diff',
                    Buffer.from(diffImage, 'base64'),
                    ContentType.PNG
                );
            } else {
                log.warn(`[Helper] Not found diff-file: ${filePattern}`);
            }
        } catch (error) {
            log.error('Error occured with diff image attachment', error);
            testReporter.addStep('Image comparison diff artifact error log');
            testReporter.addAttachment(
                'Error',
                Buffer.from(error.toString(), 'utf8'),
                ContentType.TEXT
            );
        }
    }

    static async saveElement(wdioElement, imageTag) {
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        return browser.saveElement(element, imageTag);
    }

    static async compareImages(
        wdioElement,
        imgTag,
        threshold,
        { blockOut, ignoreColors = false, autoSaveBaseline } = {}
    ) {
        const element =
      typeof wdioElement === 'object' ? await wdioElement : wdioElement;

        const options = {
            saveAboveTolerance: threshold,
            ignoreColors: ignoreColors
        };

        if (blockOut) {
            options.blockOut = blockOut;
        }

        if (typeof autoSaveBaseline !== 'undefined') {
            options.autoSaveBaseline = autoSaveBaseline;
        }

        const percentage = await browser.checkElement(element, imgTag, options);

        return new Promise((resolve) => {
            percentage < threshold ? resolve(true) : resolve(false);
        });
    }
}

module.exports = CompareImagesHelper;
