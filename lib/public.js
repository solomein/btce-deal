'use strict';

var querystring = require('querystring'),
    transport = require('./transport'),
    utils = require('./utils'),
    Config = require('./config');

function BTCEPublic () {
    this.host = Config.HOST;
    this.path = Config.Public.PATH;
    this.methods = Config.Public.Methods;
}

BTCEPublic.prototype.getInfo = function () {
    return this._callMethod(this.methods.INFO);
};

BTCEPublic.prototype.getTicker = function (pairs) {
    return this._callMethod(this.methods.TICKER, pairs);
};

BTCEPublic.prototype.getDepth = function (pairs, params) {
    params = utils.buildSingleParam(params, 'limit', 'number');
    return this._callMethod(this.methods.DEPTH, pairs, params);
};

BTCEPublic.prototype.getTrades = function (pairs, params) {
    params = utils.buildSingleParam(params, 'limit', 'number');
    return this._callMethod(this.methods.TRADES, pairs, params);
};

BTCEPublic.prototype._joinPairs = function (pairs) {
    if (typeof pairs === 'string') {
        pairs = [pairs];
    }

    return Array.isArray(pairs) ? pairs.join('-') : 'btc_usd';
};

BTCEPublic.prototype._getRequestPath = function (methodName, pairs, params) {
    params = params ? '?' + querystring.stringify(params) : '';
    return this.path + methodName + '/' + this._joinPairs(pairs) + params;
};

BTCEPublic.prototype._callMethod = function (methodName, pairs, params) {
    var options = {
        host: this.host,
        port: 443,
        path: this._getRequestPath(methodName, pairs, params),
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return transport.send(options);
};

module.exports = BTCEPublic;
