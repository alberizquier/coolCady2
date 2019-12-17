import {
    ClientAPI
} from './RestAPI/ClientAPI.js';

//Este modulo asocia la clientAPI con las funcciones de callBack que suministrará index.js
//FORBIDDEN poner document.getElementByID de nada AQUI!!!
//En el callback mandamos  los datos recibidos como parametro y el codigo de index.js los ha de asociar. 

export class Main {
    constructor() {
        this.clientAPI = new ClientAPI('localhost', '3000', 'api');
    }

    async refreshCoffeeShops(cbDisplayCoffeeShops, cbDisplayErrors) {
        try {
            var serverErrors = [];
            var coffeeShops = await this.clientAPI.getCoffeeShops(serverErrors);
            if (coffeeShops) {
                //solo he de llamar a cbDisplayCoffeeShops una vez que he recibido correctamente los datos de todas los coffeeshops
                cbDisplayCoffeeShops(coffeeShops);
            } else {
                cbDisplayErrors(serverErrors);
            }
        } catch (errorAPI) {
            cbDisplayErrors(errorAPI);
        }
    }

    async refreshCoffeeShop(cofeeShopId, cbDisplayCoffeeShop, cbDisplayErrors) {
        try {
            var serverErrors = [];
            var coffeeShop = await this.clientAPI.getOneCoffeeShop(cofeeShopId, serverErrors);
            if (coffeeShop) {
                cbDisplayCoffeeShop(coffeeShop);
            } else {
                cbDisplayErrors(serverErrors);
            }
        } catch (errorAPI) {
            cbDisplayErrors(errorAPI);
        }
    }


    async newCaddy(cofeeShopId, cbDisplayCaddy, cbDisplayErrors) {
        try {
            var serverErrors = [];
            var caddy = await this.clientAPI.newCaddy(cofeeShopId, serverErrors);
            if (caddy) {
                cbDisplayCaddy(caddy);
            } else {
                cbDisplayErrors(serverErrors);
            }
        } catch (errorAPI) {
            cbDisplayErrors(errorAPI);
        }

    }

    async closeCaddy(caddyId, cbDisplayOrder, cbDisplayErrors) {
        try {
            var serverErrors = [];
            var order = await this.clientAPI.closeCaddy(caddyId, serverErrors);
            if (order) {
                cbDisplayOrder(order);
            } else {
                cbDisplayErrors(serverErrors);
            }
        } catch (errorAPI) {
            cbDisplayErrors(errorAPI);
        }
    }

    async addProduct(caddyId, productId, quantity, price, cbDisplayCaddy, cbDisplayErrors) {
        try {
            var serverErrors = [];
            var caddy = await this.clientAPI.addProduct(caddyId, productId, quantity, price, serverErrors);
            if (caddy) {
                cbDisplayCaddy(caddy);
            } else {
                cbDisplayErrors(serverErrors);
            }
        } catch (errorAPI) {
            cbDisplayErrors(errorAPI);
        }

    }

    async removeProduct(caddyId, productId, quantity, cbDisplayCaddy, cbDisplayErrors) {
        try {
            var serverErrors = [];
            var caddy = await this.clientAPI.removeProduct(caddyId, productId, quantity, serverErrors);
            if (caddy) {
                cbDisplayCaddy(caddy);
            } else {
                cbDisplayErrors(serverErrors);
            }
        } catch (errorAPI) {
            cbDisplayErrors(errorAPI);
        }

    }

    async removeSelection(docDetailid, cbDisplayCaddy, cbDisplayErrors) {
        try {
            var serverErrors = [];
            var caddy = await this.clientAPI.removeSelection(docDetailid, serverErrors);
            if (caddy) {
                cbDisplayCaddy(caddy);
            } else {
                cbDisplayErrors(serverErrors);
            }
        } catch (errorAPI) {
            cbDisplayErrors(errorAPI);
        }

    }
}

