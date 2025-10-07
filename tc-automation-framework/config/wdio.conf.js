
const path = require('path');

global.UI_TEST = true;
global.baseTest = require('../baseTest');
global.testConfig = require('./test-config.js');
global.testConstants = require('./test-constants');

const capabilities = {
    chrome: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            prefs: { 'profile.managed_default_content_settings.notifications': 1 },
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

// This is the main configuration object for WebdriverIO
exports.config = {
    path: '/',
    runner: 'local',
    waitforTimeout: 10000,
    maxInstances: 1,
    specFileRetries: testConfig.SPEC_FILE_RETRIES,
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
    testConfig.BROWSER_NAME === 'firefox'
        ? [capabilities.firefox]
        : [capabilities.chrome],
    baseUrl: testConfig.UI_BASE_URL,
    logLevel: testConfig.LOG_LEVEL,
    specs: [
        testConfig.SPEC_NAME
    ],
    suites: {
        test: [
            'ui/test/**/*Test.js'
        ]
    },
    reporters: [
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableMochaHooks: true
        }]
    ],
    services: [
        'intercept',
        testConfig.BROWSER_NAME === 'firefox' ? 'geckodriver' : 'chromedriver',
        ['image-comparison',
            {
                baselineFolder: path.join(__dirname, '../data/TestsImages/ImagesOrigin'),
                screenshotPath: path.join(__dirname, '../data/TestsImages/ImagesTests'),
                autoSaveBaseline: true
            }
        ]
    ],
    before: async function() {
        await browser.setWindowSize(1920, 1280);
        await browser.setTimeout({ implicit: testConfig.IMPLICIT_WAIT_TIMEOUT });
        const capabilities = await browser.capabilities;
        const windowSize = await browser.getWindowSize();
        global.buildInfo = _.merge(
            _.pick(capabilities, ['browserName', 'browserVersion']),
            {windowSize: `${windowSize.width},${windowSize.height}`}
        );
        global.BROWSER_NAME = testConfig.BROWSER_NAME;
        global.chai = require('chai');
        global.chaiPromised = require('chai-as-promised');
        global.chai.use(global.chaiPromised);
        global.browserUtils = require('../ui/utils/wdioBrowserUtils.js');
        global.compareImagesHelper = require('../ui/utils/compareImagesHelper');
        global.glob = require('glob');
        if (testConfig.DELETE_IMAGES_ORIGINS === 'true') {
            await compareImagesHelper.deleteOrigins();
        }
    }
};
