'use strict';

var util = require('util');

module.exports.getTimestamp = function (time) {
    if (!time) {
        time = Date.now();
    }
    if (typeof time === 'string') {
        time = new Date(time);
    }

    if (util.isDate(time)) {
        return Math.round(time.getTime() / 1000);
    }
    if (typeof time === 'number') {
        return (time >= 0x100000000) ? Math.round(time / 1000) : time;
    }

    return 0;
};

module.exports.mixParams = function (target, params) {
    if (typeof params === 'object') {
        Object.keys(params).forEach(function (key) {
            if (key === 'since' || key === 'end') {
                target[key] = this.getTimestamp(params[key]);
            }
            else {
                target[key] = params[key];
            }
        });
    }

    return target;
};

module.exports.buildSingleParam = function (params, name, type) {
    if (typeof params === type) {
        var result = {};
        result[name] = params;
        return result;
    }

    return params;
};
