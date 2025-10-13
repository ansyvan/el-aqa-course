const { createLogger, transports, format } = require('winston');

const log = createLogger({
    format: format.printf((info) => {
        return new Date().toLocaleString({hour12: false}) +
            ` - ${info.level}: ${info.message ? info.message : ''}`;
    }),
    transports: [
        new transports.Console({
            colorize: false
        })
    ]
});

module.exports = log;
