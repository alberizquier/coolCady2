const BaseDTO = require('./BaseDTO');

class ProductDTO extends BaseDTO {
    constructor() {
        super();
        this["$type"] = "ProductDTO";
        //Los inicializo para que cuando el Product rellene un ProductForm si algun dato falta al menos hay un valor por defecto en la BD
        this.name = "";
        this.displayName = "";
        this.kind = "";
        this.subKind = "";
        this.ingredient = "";
        this.priceCost = 0;
        this.vatKind = "R";
        this.remarks = "";
        this.pictureUR = "";
    }
}

module.exports = ProductDTO;