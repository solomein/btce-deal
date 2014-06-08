# BTC-E API Wrapper for Node.js
API wrapper to BTC-E Cryptocoin Trading platform.

## Features

  * [Trade](https://btc-e.com/api/documentation) and [Public](https://btc-e.com/api/3/documentation) v3 API
  * Asynchronous requests
  * [Promises A+](http://promisesaplus.com)
  * Automatically converts dates to UNIX timestamps

## Usage

### Install

```
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
    })
    
btceTrade.getInfo()
    .then(callback)
    .error(callback)
```
### Public API
* `.getInfo()`
* `.getTicker([pairs])`
* `.getDepth([pairs], [params])`
* `.getTrades([pairs], [params])`

**pairs**  
Type: `Array` or `String`  
Default: `'btc_usd'`

#### Get info
```javascript
btcePublic.getInfo();
```

#### Get ticker
```javascript
btcePublic.getTicker()
btcePublic.getTicker('btc_usd');
btcePublic.getTicker(['btc_usd', 'ltc_usd']);

// etc.
```
#### Get depth
**params**  
Type: `Object` or `Number`
```javascript
btcePublic.getDepth()
btcePublic.getDepth('btc_usd', {limit: 10});
btcePublic.getDepth(['btc_usd', 'ltc_usd'], 10);

// etc.
```
#### Get trades
**params**  
Type: `Object` or `Number`
```javascript
btcePublic.getTrades()
btcePublic.getTrades('btc_usd', 2);
btcePublic.getTrades(['btc_usd', 'ltc_usd'], {limit: 2});

// etc.
```
### Trade API
* `.getInfo()`
* `.getTransHistory([params])`
* `.getTradeHistory([params])`
* `.getActiveOrders([params])`
* `.trade(params)`
* `.cancelOrder(params)`

#### Get trade info
```javascript
btceTrade.getInfo()
```

#### Get transaction history
```javascript
btceTrade.getTransHistory()
btceTrade.getTransHistory({count: 10, order: 'DESC'});

// etc.
```
#### Get trade history
```javascript
btceTrade.getTradeHistory()
btceTrade.getTradeHistory({pair: 'btc_usd', order: 'ASC', since: Date.now()});

// etc.
```

#### Get active orders
```javascript
btceTrade.getActiveOrders()
btceTrade.getActiveOrders('btc_usd');
btceTrade.getActiveOrders({pair: 'btc_usd'});

// etc.
```

#### Trade
```javascript
btceTrade.trade({pair: 'btc_usd', type: 'buy', rate: 100.0, amount: 2.0})
btceTrade.trade({pair: 'ltc_usd', type: 'sell', rate: 15.9, amount: 10.7})

// etc.
```

#### Cancel order
```javascript
btceTrade.cancelOrder(343154);
btceTrade.cancelOrder({order_id: 343154});

// etc.
```
