module.exports = {
    HOST: 'btc-e.com',

    Public: {
        PATH: '/api/3/',
        Methods: {
            INFO:   'info',
            TICKER: 'ticker',
            DEPTH:  'depth',
            TRADES: 'trades'
        }
    },

    Trade: {
        PATH: '/tapi/',
        Methods: {
            INFO:          'getInfo',
            TRANS_HISTORY: 'TransHistory',
            TRADE_HISTORY: 'TradeHistory',
            ACTIVE_ORDERS: 'ActiveOrders',
            TRADE:         'Trade',
            CANCEL_ORDER:  'CancelOrder',
            ORDER_INFO:    'OrderInfo'
        }
    }
};
