'use strict';

var https = require('https'),
    Promise = require('bluebird');

var parseResponse = function (response) {
    var result = null;

    try {
        result = JSON.parse(response);

        if (result.success === 0 && !result.error) {
            result.error = 'Unknown error';
        }

        if (result.success === 1 && result['return']) {
            result = result['return'];
        }
    }
    catch (e) {
        result = {error: 'JSON parsing error'};
    }

    return result;
};

module.exports.send = function (options, content) {
    return new Promise(function (resolve, reject) {
        var req = https.request(options, function (res) {
            var data = '';

            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                data += chunk;
            });

            res.on('end', function () {
                var response = parseResponse(data);

                if (response.error) {
                    reject(response);
                }
                else {
                    resolve(response);
                }
            });
        });

        req.on('error', function (e) {
            reject({error: e.message});
        });

        if (content) {
            req.write(content);
        }

        req.end();
    });
};
