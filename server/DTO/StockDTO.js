const BaseDTO = require('./BaseDTO');

class StockDTO extends BaseDTO {
    constructor() {
        super();
        this["$type"] = "StockDTO";
        //Los inicializo para que cuando el Stock rellene un StockForm si algun dato falta al menos hay un valor por defecto en la BD
        this.coffeeShopId = "";
        this.productId = "";
        this.quantityAcc = 0;
        this.quantityCon = 0;
        this.priceSell = 0;
    }

    //This is the balance method for the Qty calcs
    get quantity(){
        return this.quantityAcc - this.quantityCon;
    }

    set accQuantity(value){
        this.quantityAcc += value;
    }

    set conQuantity(value){
        this.quantityCon += value;
    }
    
}

module.exports = StockDTO;