const path = require('path');
global.UI_TEST = true;
global.baseTest = require('../baseTest');
global.testConfig = require('./test-config.js');
global.testConstants = require('./test-constants');

const capabilities = {
    chrome: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            prefs: {'profile.managed_default_content_settings.notifications': 1},
            args: testConfig.BROWSER_ARGS
        }
    },
    firefox: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
            args: testConfig.BROWSER_ARGS
        }
    }
};

exports.config = {
    path: '/',
    runner: 'local',
    geckoDriverRandomPort: false,
    geckoDriverArgs: ['--log=info'],
    waitforTimeout: 10000,
    maxInstances: 1,
    specFileRetries: testConfig.SPEC_FILE_RETRIES,
    specFileRetriesDeferred: false,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'mocha',
    mochaOpts: {
        exit: true,
        ui: 'bdd',
        timeout: 99999,
        fullTrace: true,
        recursive: true,
        inlineDiffs: true
    },
    capabilities:
        [
            capabilities.chrome,
            capabilities.firefox
        ],
    baseUrl: testConfig.UI_BASE_URL,
    logLevel:  testConfig.LOG_LEVEL,
    specs: [
        testConfig.SPEC_NAME
    ],
    suites: {
        test: [
            '../ui/test/**/*Test.js'
        ]
    },
    reporters: [
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableMochaHooks: true
        }],
        'spec'
    ],
    services: [
        'intercept',
        'chromedriver',
        'geckodriver',
        ['image-comparison',
            {
                baselineFolder: path.join(__dirname, '../data/TestsImages/ImagesOrigin'),
                screenshotPath: path.join(__dirname, '../data/TestsImages/ImagesTests'),
                formatImageName: '{tag}-{logName}-{browserName}-{width}x{height}',
                savePerInstance: true,
                autoSaveBaseline: true
            }
        ]
    ],
    before: async function() {
        global.expect = require('chai').expect;
        await browser.setWindowSize(1920, 1280);
        await browser.setTimeout({'implicit': testConfig.IMPLICIT_WAIT_TIMEOUT});
        const capabilities = await browser.capabilities;
        const windowSize = await browser.getWindowSize();
        global.buildInfo = _.merge(
            _.pick(capabilities, ['browserName', 'browserVersion']),
            {windowSize: `${windowSize.width},${windowSize.height}`}
        );
        global.BROWSER_NAME = testConfig.BROWSER_NAME;
        global.browserUtils = require('../ui/utils/wdioBrowserUtils.js');
        global.compareImagesHelper = require('../ui/utils/compareImagesHelper');
        global.glob = require('glob');
        if (testConfig.DELETE_IMAGES_ORIGINS === 'true') {
            await compareImagesHelper.deleteOrigins();
        }
    }
};
