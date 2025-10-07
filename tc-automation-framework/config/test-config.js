
const config = {
    BROWSER_NAME: process.env.BROWSER_NAME || 'chrome',
    IMPLICIT_WAIT_TIMEOUT: Number(process.env.IMPLICIT_WAIT_TIMEOUT) || 2000,
    SPEC_NAME: process.env.SPEC_NAME || 'ui/test/**/*Test.js',
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    DELETE_IMAGES_ORIGINS: process.env.DELETE_IMAGES_ORIGINS || 'false',
    SPEC_FILE_RETRIES: Number(process.env.SPEC_FILE_RETRIES) || 0,
    BROWSER_ARGS: process.env.BROWSER_ARGS ? process.env.BROWSER_ARGS.split(';') : undefined,
    ELEMENT_VISIBILITY_TIMEOUT: process.env.ELEMENT_VISIBILITY_TIMEOUT || 4000,
    MAX_WAIT_RETRY: process.env.MAX_WAIT_RETRY || 3,
    PROXY_HOST: process.env.PROXY_HOST || 'localhost',
    PROXY_PORT: process.env.PROXY_PORT || 8090,
    PROXY_PROTOCOL: process.env.PROXY_PROTOCOL || 'https',
    SERVER_URL: process.env.SERVER_URL || 'https://swapi.dev/api/',
    UI_BASE_URL: process.env.FRONTEND_URL || 'http://localhost:3000'
};

module.exports = config;
