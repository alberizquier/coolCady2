import {
    coffeeShopsMock,
    fullCoffeeShopsMock,
    productsMock
} from './fixtures/mock.data.js';
import {
    CaddyMock
} from './Caddy.mock.js';

export class ClientAPIMock {
    constructor(hostName, portNumber, apiPath) {
        this.hostName = hostName;
        this.portNumber = portNumber;
        this.apiPath = apiPath;
        this.currentCaddy = null;
    }

    get uri() {
        return `http://${this.hostName}:${this.portNumber}/${this.apiPath}`;
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

    async getCoffeeShops(errors) {
        try {
            debugger;
            var response = coffeeShopsMock;
            var dataJson = response;
            return dataJson;
        } catch (error) {
            errors.push(error.message);
        }
        return null;
    }

    async getOneCoffeeShop(coffeeShopId, errors) {
        try {
            for (let coffeeShop of fullCoffeeShopsMock) {
                if (coffeeShop.id == coffeeShopId) {
                    var response = coffeeShop;
                    var dataJson = response;
                    return dataJson;
                }
            }
            errors.push('getOneCoffeeShop() FAILS,coffeeShopId not found!');
        } catch (error) {
            errors.push(error.message);
        }
        return null;
    }

    async newCaddy(coffeeShopId, errors) {
        try {
            for (let coffeeShop of coffeeShopsMock) {
                if (coffeeShop.id == coffeeShopId) {
                    let caddyMock = new CaddyMock();
                    caddyMock.coffeeShopId = coffeeShopId;
                    caddyMock.coffeeShop = coffeeShop;
                    this.currentCaddy = caddyMock;
                    this.calculateTotals();
                    var response = caddyMock;
                    var dataJson = response;
                    return dataJson;
                }
            }
            errors.push('newCaddy() FAILS,Imposible to create a new Caddy, coffeeShopId not found!');
        } catch (error) {
            errors.push(error.message);
        }
        return null;
    }

    async closeCaddy(caddyId, errors) {
        try {
            if (!this.currentCaddy) {
                errors.push('closeCaddy() FAILS,Caddy not created already, call newCaddy() first');
            } else {
                if (this.currentCaddy.id == caddyId) {
                    this.currentCaddy.docState = "close";
                    this.currentCaddy.rowVersion++;
                    var response = this.currentCaddy;
                    var dataJson = response;
                    return dataJson;
                }
            }
            errors.push('closeCaddy() FAILS,Imposible to close a Caddy, caddyId not found!');
        } catch (error) {
            errors.push(error.message);
        }
        return null;
    }

    async addProduct(caddyId, productId, quantity, price, errors) {
        try {
            debugger;
            if (!this.currentCaddy) {
                errors.push('addProduct() FAILS,Caddy not created already, call newCaddy() first');
            } else {
                if (this.currentCaddy.id == caddyId) {
                    for (let docDetail of this.currentCaddy.docDetails) {
                        if (docDetail.productId == productId) {
                            docDetail.quantity += quantity;
                            docDetail.rowVersion++;
                            this.calculateTotals();
                            var response = this.currentCaddy;
                            var dataJson = response;
                            return dataJson;
                        }
                    }
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
                            var response = this.currentCaddy;
                            var dataJson = response;
                            return dataJson;
                        }
                    }
                    errors.push('addProduct() FAILS,productId not found!');
                } else {
                    errors.push('addProduct() FAILS,Imposible to addProduct to Caddy, caddyId not found!');
                }
            }
        } catch (error) {
            errors.push(error.message);
        }

        return null;
    }

    async removeProduct(caddyId, productId, quantity, errors) {
        try {
            if (!this.currentCaddy) {
                errors.push('removeProduct() FAILS,Caddy not created already, call newCaddy() first');
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
                            var response = this.currentCaddy;
                            var dataJson = response;
                            return dataJson;
                        }
                        index++;
                    }
                    errors.push('removeProduct() FAILS,productId not found!');
                } else {
                    errors.push('removeProduct() FAILS, Imposible to removeProducta product, caddyId not found!');
                }
            }
        } catch (error) {
            errors.push(error.message);
        }
        return null;
    }

    async removeSelection(docDetailid, errors) {
        try {
            if (!this.currentCaddy) {
                errors.push('removeSelection()FAILS: ,Caddy not created already, call newCaddy() first');
            } else {
                let index = 0;
                for (let docDetail of this.currentCaddy.docDetails) {
                    if (docDetail.id == docDetailid) {
                        this.currentCaddy.docDetails.splice(index, 1);

                        this.calculateTotals();
                        var response = this.currentCaddy;
                        var dataJson = response;
                        return dataJson;
                    }
                    index++;
                }
                errors.push('removeSelection()FAILS: ,docDetailid not found!');
            }
        } catch (error) {
            errors.push(error.message);
        }
        return null;
    }
}