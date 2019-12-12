const BaseDTO = require('./BaseDTO');

class DocDetailDTO extends BaseDTO {
    constructor() {
        super();
        this["$type"] = "DocDetailDTO";
        //Los inicializo para que cuando el DocDetail rellene un DocDetailForm si algun dato falta al menos hay un valor por defecto en la BD
        this.docHeaderId = "";
        this.productId = "";
        this.quantity = 0;
        this.price = 0;
        this.percentageDiscount = 0;
        this.vatKind = "";
        this.title = "";
        this.remarks = "";
    }
}

module.exports = DocDetailDTO;