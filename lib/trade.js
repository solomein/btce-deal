'use strict';

var querystring = require('querystring'),
    crypto = require('crypto'),
    utils = require('./utils'),
    transport = require('./transport'),
    Config = require('./config');

function BTCETrade (key, secret) {
    this.key = key;
    this.secret = secret;
    this.nonce = utils.getTimestamp();

    this.host = Config.HOST;
    this.path = Config.Trade.PATH;
    this.methods = Config.Trade.Methods;
}

BTCETrade.prototype.getInfo = function () {
    return this._callMethod(this.methods.INFO);
};

BTCETrade.prototype.getTransHistory = function (params) {
    return this._callMethod(this.methods.TRANS_HISTORY, params);
};

BTCETrade.prototype.getTradeHistory = function (params) {
    return this._callMethod(this.methods.TRADE_HISTORY, params);
};

BTCETrade.prototype.getActiveOrders = function (params) {
    params = utils.buildSingleParam(params, 'pair', 'string');
    return this._callMethod(this.methods.ACTIVE_ORDERS, params);
};

BTCETrade.prototype.trade = function (params) {
    return this._callMethod(this.methods.TRADE, params);
};

BTCETrade.prototype.cancelOrder = function (params) {
    params = utils.buildSingleParam(params, 'order_id', 'number');
    return this._callMethod(this.methods.CANCEL_ORDER, params);
};

BTCETrade.prototype.getOrderInfo = function (params) {
    params = utils.buildSingleParam(params, 'order_id', 'number');
    return this._callMethod(this.methods.ORDER_INFO, params);
};

BTCETrade.prototype._callMethod = function (methodNames, params) {
    var content = {
        method: methodNames,
        nonce: ++this.nonce
    };

    utils.mixParams(content, params);
    content = querystring.stringify(content);

    var sign = crypto
        .createHmac('sha512', new Buffer(this.secret, 'utf8'))
        .update(new Buffer(content, 'utf8'))
        .digest('hex');

    var options = {
        host: this.host,
        port: 443,
        path: this.path,
        method: 'POST',
        headers: {
            'Key': this.key,
            'Sign': sign,
            'content-type': 'application/x-www-form-urlencoded',
            'content-length': content.length
        }
    };

    return transport.send(options, content);
};

module.exports = BTCETrade;
