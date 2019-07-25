"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require('winston');
var Logger = /** @class */ (function () {
    function Logger() {
        this.logger = winston.createLogger({
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: './server/logs/nodeApp.log' })
            ]
        });
    }
    Logger.prototype.info = function (log) {
        console.log(log);
        this.logger.info(log);
    };
    Logger.prototype.debug = function (log) {
        this.logger.debug(log);
    };
    Logger.prototype.warn = function (log) {
        this.logger.warn(log);
    };
    Logger.prototype.error = function (log) {
        this.logger.error(log);
    };
    return Logger;
}());
//# sourceMappingURL=logger.js.map