/* global Log4js, hxLogCategory */
"use strict";

window.hxLogCategory = [];
window.hxLog = function (categoryName, level, message) {
    var logSys, bNewCategory = false;

    if(typeof categoryName !== "string" || typeof level !== "string") {
        return false;
    }

    if(hxLogCategory[categoryName]) {
        bNewCategory = true;
    }

    logSys = Log4js.getLogger(categoryName);
    if(!logSys || !logSys[level]) {
        return false;
    }

    if(!bNewCategory) {
        hxLogCategory[categoryName] = categoryName;

        /* set default configuration */
        logSys.setLevel(Log4js.Level.WARN);
        logSys.addAppender(new Log4js.BrowserConsoleAppender());
    }

    logSys[level](message);
    return true;
};

window.setHxLogLevel = function (categoryName, level) {
    var logSys, logLevel;

    if(typeof categoryName !== "string" || typeof level !== "string") {
        return false;
    }

    if(!hxLogCategory[categoryName]) {
        return false;
    }

    logSys = Log4js.getLogger(categoryName);
    if(!logSys) {
        return false;
    }

    logLevel = logSys.level.toLevel(level, -1);
    if(logLevel < 0) {
        return false;
    }

    logSys.setLevel(logLevel);
    return true;
};