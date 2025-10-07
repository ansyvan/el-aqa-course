
const winston = require('winston');

const log = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            timestamp: function() {
                return (new Date()).toLocaleString({hour12: false});
            },
            colorize: false
        })
    ]
});

module.exports = log;
