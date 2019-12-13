const CrudAPI = require('./CrudAPI');


class ProductsAPI extends CrudAPI {
    constructor(uri, app,services) {
        super(uri + '/products', app, "Products",services.productsService);
    }
}

module.exports = ProductsAPI;