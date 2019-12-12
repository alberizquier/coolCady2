const CrudAPI = require('./CrudAPI');


class ProductsAPI extends CrudAPI {
    constructor(uri, app,services) {
        super(uri + '/Products', app, "Products",services.productsService);
    }
}

module.exports = ProductsAPI;