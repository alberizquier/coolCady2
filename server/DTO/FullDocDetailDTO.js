const DocDetailDTO = require('./DocDetailDTO');
const ProductDTO = require('./ProductDTO');

class FullDocDetailDTO extends DocDetailDTO {
    constructor() {
        super();
        this["$type"] = "FullDocDetailDTO";
        //Los inicializo para que cuando el DocDetail rellene un DocDetailForm si algun dato falta al menos hay un valor por defecto en la BD
       this.product = [new ProductDTO()];
    }
}

module.exports = FullDocDetailDTO;