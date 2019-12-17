const BaseDTO = require('./BaseDTO');

class CoffeeShopDTO extends BaseDTO {
    constructor() {
        super();
        this["$type"] = "CoffeeShopDTO";
        //Los inicializo para que cuando el CoffeeShop rellene un CoffeeShopForm si algun dato falta al menos hay un valor por defecto en la BD
        this.name = "";
        this.displayName = "";
        this.address = "";
        this.backgroundPictureURL = "";
        this.logoURL="";
        this.description = "";
    }
}

module.exports = CoffeeShopDTO;