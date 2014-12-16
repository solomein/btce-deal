# BTC-E API Wrapper for Node.js
API wrapper to BTC-E Cryptocoin Trading platform.

## Features

  * [Trade](https://btc-e.com/api/documentation) and [Public](https://btc-e.com/api/3/documentation) v3 API
  * Asynchronous requests
  * [Promises A+](http://promisesaplus.com)
  * Automatically converts dates to UNIX timestamps

<hr>

## Usage

### Install

```bash
$ npm install --save btce-deal
```

### Init
BTC-E Deal provides separate objects for access to the Public and Trade API.

```javascript
var BTCE = require('btce-deal');

var btcePublic = new BTCE.Public(),
    btceTrade = new BTCE.Trade('YOUR-KEY', 'YOUR-SECRET');
```
All methods return a `Promise` object ([bluebird](https://github.com/petkaantonov/bluebird) implementation).
```javascript
btcePublic.getInfo()
    .then(function (data) {
        // success handling
    })
    .error(function (data) {
        // error handling
    });
    
btceTrade.getInfo()
    .then(callback)
    .error(callback);
```

<hr>

### Public API
* [`.getInfo()`](#get-info)
* [`.getTicker([pairs])`](#get-ticker)
* [`.getDepth([pairs], [params])`](#get-depth)
* [`.getTrades([pairs], [params])`](#get-trades)

**pairs**  
Type: `Array` or `String`  
Default: `'btc_usd'`

More information about the parameters can be found in BTC-E Public API [documentation](https://btc-e.com/api/3/documentation).

#### Get info
```javascript
btcePublic.getInfo();
```

#### Get ticker
```javascript
btcePublic.getTicker();
btcePublic.getTicker('btc_usd');
btcePublic.getTicker(['btc_usd', 'ltc_usd']);

// etc.
```
#### Get depth
**params**  
Type: `Object` or `Number`
```javascript
btcePublic.getDepth();
btcePublic.getDepth('btc_usd', {limit: 10});
btcePublic.getDepth(['btc_usd', 'ltc_usd'], 10);

// etc.
```
#### Get trades
**params**  
Type: `Object` or `Number`
```javascript
btcePublic.getTrades();
btcePublic.getTrades('btc_usd', 2);
btcePublic.getTrades(['btc_usd', 'ltc_usd'], {limit: 2});

// etc.
```

<hr>

### Trade API
* [`.getInfo()`](#get-trade-info)
* [`.getTransHistory([params])`](#get-transaction-history)
* [`.getTradeHistory([params])`](#get-trade-history)
* [`.getActiveOrders([params])`](#get-active-orders)
* [`.trade(params)`](#trade)
* [`.cancelOrder(params)`](#cancel-order)
* [`.getOrderInfo(params)`](#get-order-info)

More information about the parameters can be found in BTC-E Trade API [documentation](https://btc-e.com/api/documentation).

#### Get trade info
```javascript
btceTrade.getInfo();
```

#### Get transaction history
```javascript
btceTrade.getTransHistory();
btceTrade.getTransHistory({count: 10, order: 'DESC'});

// etc.
```
#### Get trade history
```javascript
btceTrade.getTradeHistory();
btceTrade.getTradeHistory({pair: 'btc_usd', order: 'ASC', since: Date.now()});

// etc.
```

#### Get active orders
**params**  
Type: `Object` or `String`
```javascript
btceTrade.getActiveOrders();
btceTrade.getActiveOrders('btc_usd');
btceTrade.getActiveOrders({pair: 'btc_usd'});

// etc.
```

#### Trade
```javascript
btceTrade.trade({pair: 'btc_usd', type: 'buy', rate: 100.0, amount: 2.0});
btceTrade.trade({pair: 'ltc_usd', type: 'sell', rate: 15.9, amount: 10.7});

// etc.
```

#### Cancel order
**params**  
Type: `Object` or `Number`
```javascript
btceTrade.cancelOrder(343154);
btceTrade.cancelOrder({order_id: 343154});

// etc.
```

#### Get order info
**params**  
Type: `Object` or `Number`
```javascript
btceTrade.getOrderInfo(343154);
btceTrade.getOrderInfo({order_id: 343154});

// etc.
```