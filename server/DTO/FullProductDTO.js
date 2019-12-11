const ProductDTO = require('./ProductDTO');
const FullStockDTO = require('./FullStockDTO');

class FullProductDTO extends ProductDTO {
    constructor() {
        super();
        this["$type"] = "FullProductDTO";
        this.stocks = [new FullStockDTO()];
    }

}


module.exports = FullProductDTO;