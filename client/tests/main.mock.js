//#region Data
import {
    coffeeShopsMock,
    fullCoffeeShopsMock,
    productsMock
} from './fixtures/mock.data.js';

import {CaddyMock} from './Caddy.mock.js';


//#endregion

class MainMock {
    constructor() {
        this.currentCaddy = null;
    }

    calculateTotals() {
        //Ponemos a 0 los totales
        this.currentCaddy.amountDue = 0;
        this.currentCaddy.amountPayed = 0;

        this.currentCaddy.taxBaseR = 0;
        this.currentCaddy.taxBaseS = 0;
        this.currentCaddy.taxBaseN = 0;
        this.currentCaddy.totalItems = 0;

        //recorremos todos los detalles
        for (let docDetail of this.currentCaddy.docDetails) {
            this.currentCaddy.totalItems += docDetail.quantity;
            //vamos acumulando en taxBaseX += docDetail.price * docDetail.quantity;
            switch (docDetail.vatKind) {
                case "N":
                    this.currentCaddy.taxBaseN += docDetail.price * docDetail.quantity
                    break;
                case "S":
                    this.currentCaddy.taxBaseS += docDetail.price * docDetail.quantity
                    break;
                case "R":
                default:
                    this.currentCaddy.taxBaseR += docDetail.price * docDetail.quantity
                    break;
            }
        }
        this.currentCaddy.amountDue =
            this.currentCaddy.taxBaseR * (1 + this.currentCaddy.percentageBaseR) +
            this.currentCaddy.taxBaseN * (1 + this.currentCaddy.percentageBaseN) +
            this.currentCaddy.taxBaseS * (1 + this.currentCaddy.percentageBaseS);

        this.currentCaddy.rowVersion++;
    }

    async refreshCoffeeShops(cbDisplayCoffeeShops, cbDisplayErrors) {
        cbDisplayCoffeeShops(coffeeShopsMock);
    }

    async refreshCoffeeShop(coffeeShopId, cbDisplayCoffeeShop, cbDisplayErrors) {
        var errors = [];
        for (let fullCoffeeShopMock of fullCoffeeShopsMock) {
            if (fullCoffeeShopMock.id == coffeeShopId) {
                cbDisplayCoffeeShop(fullCoffeeShopMock);
                return;
            }
        }
        errors.push('coffeeShopID Not Found!');
        cbDisplayErrors(errors);
    }

    async newCaddy(coffeeShopId, cbDisplayCaddy, cbDisplayErrors) {
        var errors = [];
        for (let coffeeShop of coffeeShopsMock) {
            if (coffeeShop.id == coffeeShopId) {
                let caddyMock = new CaddyMock();
                caddyMock.coffeeShopId = coffeeShopId;
                caddyMock.coffeeShop = coffeeShop;
                this.currentCaddy = caddyMock;
                this.calculateTotals();
                cbDisplayCaddy(caddyMock);
                return;
            }
        }
        errors.push('Imposible to create a new Caddy, coffeeShopId not found!');
        cbDisplayErrors(errors);
    }

    async closeCaddy(caddyId, cbDisplayOrder, cbDisplayErrors) {
        var errors = [];
        if (!this.currentCaddy) {
            errors.push('Caddy not created already, call newCaddy() first');
        } else {

            if (this.currentCaddy.id == caddyId) {
                this.currentCaddy.docState = "close";
                this.currentCaddy.rowVersion++;
                cbDisplayOrder(this.currentCaddy);
                return;
            }

            errors.push('Imposible to close a Caddy, caddyId not found!');
        }
        cbDisplayErrors(errors);
    }

    async addProduct(caddyId, productId, quantity, price, cbDisplayCaddy, cbDisplayErrors) {
        var errors = [];
        console.log(`addProduct()`, caddyId, productId, quantity, price);
        if (!this.currentCaddy) {
            errors.push('Caddy not created already, call newCaddy() first');
        } else {
            if (this.currentCaddy.id == caddyId) {
                for (let docDetail of this.currentCaddy.docDetails) {
                    if (docDetail.productId == productId) {
                        docDetail.quantity += quantity;
                        docDetail.rowVersion++;
                        this.calculateTotals();
                        cbDisplayCaddy(this.currentCaddy);
                        return;
                    }
                }
                console.log(`productsMock`, productsMock);
                for (let productMock of productsMock) {
                    if (productMock.id == productId) {
                        let docDetail = {
                            "$type": "FullDocDetailDTO",
                            "id": Math.random() * 1000000000,
                            "rowVersion": 0,
                            "docHeaderId": caddyId,
                            "productId": productId,
                            "quantity": quantity,
                            "price": price,
                            "percentageDiscount": 0,
                            "vatKind": "R",
                            "title": productMock.displayName,
                            "remarks": productMock.ingredients,
                            "product": productMock
                        };
                        this.currentCaddy.docDetails.push(docDetail);
                        this.calculateTotals();
                        cbDisplayCaddy(this.currentCaddy);
                        return;
                    }
                }
                errors.push('productId not found!');
            } else {
                errors.push('Imposible to addProduct to Caddy, caddyId not found!');
            }
        }
        cbDisplayErrors(errors);
    }

    async removeProduct(caddyId, productId, quantity, cbDisplayCaddy, cbDisplayErrors) {
        var errors = [];
        if (!this.currentCaddy) {
            errors.push('Caddy not created already, call newCaddy() first');
        } else {
            if (this.currentCaddy.id == caddyId) {
                let index = 0;
                for (let docDetail of this.currentCaddy.docDetails) {
                    if (docDetail.productId == productId) {
                        let tmp = docDetail.quantity - quantity;
                        if (tmp <= 0) {
                            this.currentCaddy.docDetails.splice(index, 1);
                        } else {
                            docDetail.quantity = tmp;
                            docDetail.rowVersion++;
                        }
                        this.calculateTotals();
                        cbDisplayCaddy(this.currentCaddy);
                        return;
                    }
                    index++;
                }
                errors.push('productId not found!');
            } else {
                errors.push('Imposible to removeProducta product, caddyId not found!');
            }
        }
        cbDisplayErrors(errors);
    }

    async removeSelection(docDetailid, cbDisplayCaddy, cbDisplayErrors) {
        var errors = [];
        if (!this.currentCaddy) {
            errors.push('Caddy not created already, call newCaddy() first');
        } else {
            let index = 0;
            for (let docDetail of this.currentCaddy.docDetails) {
                if (docDetail.id == docDetailid) {
                    this.currentCaddy.docDetails.splice(index, 1);

                    this.calculateTotals();
                    cbDisplayCaddy(this.currentCaddy);
                    return;
                }
                index++;
            }
            errors.push('docDetailid not found!');
        }
        cbDisplayErrors(errors);
    }
}

export {
    MainMock,
    CaddyMock
};