const CoffeeShopDTO = require('./CoffeeShopDTO');
const FullStockDTO = require('./FullStockDTO');

class FullCoffeeShopDTO extends CoffeeShopDTO {
    constructor() {
        super();
        this["$type"] = "FullCoffeeShopDTO";
        this.stocks = [new FullStockDTO()];
    }

}


module.exports = FullCoffeeShopDTO;