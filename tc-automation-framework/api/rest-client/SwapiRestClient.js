const testConfig = require('../../config/test-config');
const axios = require('axios-proxy-fix');
const log = require('../utils/test-logger');
const apiBaseUrl = testConfig.SWAPI_SERVER_URL;
log.level = testConfig.LOG_LEVEL || 'info';

const proxyParams = {
    proxy: {
        host: testConfig.PROXY_HOST,
        port: testConfig.PROXY_PORT,
        protocol: testConfig.PROXY_PROTOCOL
    }
};

const client = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
    },
    validateStatus: function(status) {
        if (global.UI_TEST === true)
            return status < 310;
        else return status < 600;
    },
    maxRedirects: 0
});

client.interceptors.request.use(async function(config) {
    testConfig.USE_PROXY === 'true' ? config.proxy = proxyParams.proxy : delete config.proxy;
    config.cookie ? config.headers['Cookie'] = config.cookie : delete config.headers['Cookie'];
    config.contentType ? config.headers['Content-Type'] = config.contentType : null;
    config.maxRedirects ? client.maxRedirects = config.maxRedirects : null;
    global.UI_TEST === true ?
        testReporter.addStep(`Sending API request ${config.method.toUpperCase() + ' ' + config.url}`, () => {}) : null;
    return config;
}, function(error) {
    log.debug(error);
    return Promise.reject(error);
});

client.interceptors.response.use((response) => {
    response.body = response.data;
    log.debug(response.config.method.toUpperCase() + ' ' + response.config.url);
    log.debug(response.status + ' ' + response.statusText);
    log.debug(JSON.stringify(response.config.headers));
    log.debug(response.config.data);
    if (response.status >= 400)
        log.debug(JSON.stringify(response.body));
    return response;
}, (error) => {
    let errorMessage;
    if (error.response) {
        errorMessage = `${error.response.status} ${error.response.statusText} ${JSON.stringify(error.response.data)} 
        ${error.response.request._header}`;
        log.debug(JSON.stringify(error.response.config));
    } else {
        errorMessage = error;
    }
    if (global.UI_TEST === true)
        return Promise.reject(errorMessage);
});

module.exports = {
    client
};
