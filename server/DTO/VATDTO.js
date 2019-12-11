
const BaseDTO = require('./BaseDTO');

class VATDTO extends BaseDTO {
    constructor() {
        super();
        this["$type"] = "VATDTO";
        //Los inicializo para que cuando el VAT rellene un VATForm si algun dato falta al menos hay un valor por defecto en la BD
        this.kind = "";
        this.displayName = "";
        this.percentage = 0;
    }
}

module.exports = VATDTO;
