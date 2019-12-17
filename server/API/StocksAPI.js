const CrudAPI = require('./CrudAPI');

class StocksAPI extends CrudAPI {
    constructor(uri, app,services) {
        super(uri + '/stocks', app, "Stocks",services.stocksService);
    }
}

module.exports = StocksAPI;