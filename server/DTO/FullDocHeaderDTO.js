const DocHeaderDTO = require('./DocHeaderDTO');
const FullDocDetailDTO = require('./FullDocDetailDTO');
const CoffeeShop = require('./CoffeeShopDTO');

class FullDocHeaderDTO extends DocHeaderDTO {
    constructor() {
        super();
        this["$type"] = "FullDocHeaderDTO";
        //Los inicializo para que cuando el DocHeader rellene un DocHeaderForm si algun dato falta al menos hay un valor por defecto en la BD
       this.docDetails = [new FullDocDetailDTO()];
       this.coffeeShop = new CoffeeShop();
    }
}

module.exports = FullDocHeaderDTO;