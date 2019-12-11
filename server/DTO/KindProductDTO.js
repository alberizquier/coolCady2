
const BaseDTO = require('./BaseDTO');

class KindProductDTO extends BaseDTO {
    constructor() {
        super();
        this["$type"] = "KindProductDTO";
        //Los inicializo para que cuando el KindProduct rellene un KindProductForm si algun dato falta al menos hay un valor por defecto en la BD
        this.kind = "";
        this.subKind = "";
        this.description = "";
    }
}

module.exports = KindProductDTO;
