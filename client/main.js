//Este modulo asocia la clientAPI con las funcciones de callBack que suministrará index.js
//FORBIDDEN poner document.getElementByID de nada AQUI!!!
//En el callback mandamos  los datos recibidos como parametro y el codigo de index.js los ha de asociar. 

export class Main {
    constructor(clientAPI) {
        this.clientAPI = clientAPI;
    }

    async refreshCoffeeShops(cbDisplayCoffeeShops, cbDisplayErrors) {
        try {
            var serverErrors = [];
            var coffeeShops = await this.clientAPI.getCoffeeShops(serverErrors);
            if (coffeeShops) {
                //solo he de llamar a cbDisplayCoffeeShops una vez que he recibido correctamente los datos de todas los coffeeshops
                await cbDisplayCoffeeShops(coffeeShops);
            } else {
                await cbDisplayErrors(serverErrors);
            }
        } catch (errorAPI) {
            await cbDisplayErrors(errorAPI);
        }
    }

    async refreshCoffeeShop(coffeeShopId, cbDisplayCoffeeShop, cbDisplayErrors) {
        try {
            var serverErrors = [];
            var coffeeShop = await this.clientAPI.getOneCoffeeShop(coffeeShopId, serverErrors);
            if (coffeeShop) {
                await cbDisplayCoffeeShop(coffeeShop);
            } else {
                await cbDisplayErrors(serverErrors);
            }
        } catch (errorAPI) {
            await cbDisplayErrors(errorAPI);
        }
    }

    async newCaddy(coffeeShopId, cbDisplayCaddy, cbDisplayErrors) {
        try {
            var serverErrors = [];
            var caddy = await this.clientAPI.newCaddy(coffeeShopId, serverErrors);
            if (caddy) {
                await cbDisplayCaddy(caddy);
            } else {
                await cbDisplayErrors(serverErrors);
            }
        } catch (errorAPI) {
            await cbDisplayErrors(errorAPI);
        }

    }

    async closeCaddy(caddyId, cbDisplayOrder, cbDisplayErrors) {
        try {
            var serverErrors = [];
            var order = await this.clientAPI.closeCaddy(caddyId, serverErrors);
            if (order) {
                await cbDisplayOrder(order);
            } else {
                await cbDisplayErrors(serverErrors);
            }
        } catch (errorAPI) {
            await cbDisplayErrors(errorAPI);
        }
    }

    async addProduct(caddyId, productId, quantity, price, cbDisplayCaddy, cbDisplayErrors) {
        try {
            var serverErrors = [];
            var caddy = await this.clientAPI.addProduct(caddyId, productId, quantity, price, serverErrors);
            if (caddy) {
                await cbDisplayCaddy(caddy);
            } else {
                await cbDisplayErrors(serverErrors);
            }
        } catch (errorAPI) {
            await cbDisplayErrors(errorAPI);
        }

    }

    async removeProduct(caddyId, productId, quantity, cbDisplayCaddy, cbDisplayErrors) {
        try {
            var serverErrors = [];
            var caddy = await this.clientAPI.removeProduct(caddyId, productId, quantity, serverErrors);
            if (caddy) {
                await cbDisplayCaddy(caddy);
            } else {
                await cbDisplayErrors(serverErrors);
            }
        } catch (errorAPI) {
            await cbDisplayErrors(errorAPI);
        }

    }

    async removeSelection(docDetailid, cbDisplayCaddy, cbDisplayErrors) {
        try {
            var serverErrors = [];
            var caddy = await this.clientAPI.removeSelection(docDetailid, serverErrors);
            if (caddy) {
                await cbDisplayCaddy(caddy);
            } else {
                await cbDisplayErrors(serverErrors);
            }
        } catch (errorAPI) {
            await cbDisplayErrors(errorAPI);
        }

    }
}

