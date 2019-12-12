const BaseDTO = require('./BaseDTO');

class DocHeaderDTO extends BaseDTO {
    constructor() {
        super();
        this["$type"] = "DocHeaderDTO";
        //Los inicializo para que cuando el DocHeader rellene un DocHeaderForm si algun dato falta al menos hay un valor por defecto en la BD
        this.year= 0;
        this.docNumber= 0;
        this.coffeeShopId= "";
        this.docDate= new Date();
        this.sellerId= "";
        this.clientId= "";
        this.paymentMethod= "";
        this.paymentDoc= "";
        this.paymentAuth= "";
        this.docKind= "";
        this.docState= "";
        this.taxBaseS= 0;
        this.taxBaseR= 0;
        this.taxBaseN= 0;
        this.percentageBaseS= 0;
        this.percentageBaseR= 0;
        this.percentageBaseN= 0;
        this.percentageDiscount= 0;
        this.amountDue= 0;
        this.amountPayed= 0;
    }
}

module.exports = DocHeaderDTO;