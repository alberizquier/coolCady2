const ProductDTO = require('./ProductDTO');
const FullStockDTO = require('./FullStockDTO');
const VATDTO = require('./VATDTO');

class FullProductDTO extends ProductDTO {
    constructor() {
        super();
        this["$type"] = "FullProductDTO";
        this.stocks = [new FullStockDTO()];
        this.vat = new VATDTO();
    }

}


module.exports = FullProductDTO;