const StockDTO = require('./StockDTO');
const ProductDTO = require('./ProductDTO');
const CoffeeShopDTO = require('./CoffeeShopDTO');


class FullStockDTO extends StockDTO {
    constructor() {
        super();
        this["$type"] = "FullStockDTO";
        this.product = new ProductDTO();
        this.coffeeShop = new CoffeeShopDTO();
    }

}


module.exports = FullStockDTO;