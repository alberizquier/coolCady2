const CrudAPI = require('./CrudAPI');


class CoffeeShopsAPI extends CrudAPI {
    constructor(uri, app,services) {
        super(uri + '/coffeeshops', app, "CoffeeShops",services.coffeeShopsService);
    }
}

module.exports = CoffeeShopsAPI;