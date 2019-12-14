import {
    ClientAPI
} from './RestAPI/ClientAPI.js';

//Este modulo asocia la clientAPI con las funcciones de callBack que suministrará index.js
//FORBIDDEN poner document.getElementByID de nada AQUI!!!
//En el callback mandamos  los datos recibidos como parametro y el codigo de index.js los ha de asociar. 
var clientAPI = new ClientAPI('localhost', '3000', 'api');

export async function refreshCoffeeShops(cbDisplayCoffeeShops, cbDisplayErrors) {
    try {
        var serverErrors = [];
        var coffeeShops = await clientAPI.getCoffeeShops(serverErrors);
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

export async function refreshCoffeeShop(cofeeShopId, cbDisplayCoffeeShop, cbDisplayErrors) {
    try {
        var serverErrors = [];
        var coffeeShop = await clientAPI.getOneCoffeeShop(cofeeShopId, serverErrors);
        if (coffeeShop) {
            cbDisplayCoffeeShop(coffeeShop);
        } else {
            cbDisplayErrors(serverErrors);
        }
    } catch (errorAPI) {
        cbDisplayErrors(errorAPI);
    }
}


export async function newCaddy(cofeeShopId, cbDisplayCaddy, cbDisplayErrors) {
    try {
        var serverErrors = [];
        var caddy = await clientAPI.newCaddy(cofeeShopId, serverErrors);
        if (caddy) {
            cbDisplayCaddy(caddy);
        } else {
            cbDisplayErrors(serverErrors);
        }
    } catch (errorAPI) {
        cbDisplayErrors(errorAPI);
    }

}

export async function addProduct(caddyId, productId, quantity, price, cbDisplayCaddy, cbDisplayErrors) {
    try {
        var serverErrors = [];
        var caddy = await clientAPI.addProduct(caddyId, productId, quantity, price, serverErrors);
        if (caddy) {
            cbDisplayCaddy(caddy);
        } else {
            cbDisplayErrors(serverErrors);
        }
    } catch (errorAPI) {
        cbDisplayErrors(errorAPI);
    }

}

export async function removeProduct(caddyId, productId, quantity, cbDisplayCaddy, cbDisplayErrors) {
    try {
        var serverErrors = [];
        var caddy = await clientAPI.removeProduct(caddyId, productId, quantity, serverErrors);
        if (caddy) {
            cbDisplayCaddy(caddy);
        } else {
            cbDisplayErrors(serverErrors);
        }
    } catch (errorAPI) {
        cbDisplayErrors(errorAPI);
    }

}

export async function removeSelection(docDetailid, cbDisplayCaddy, cbDisplayErrors) {
    try {
        var serverErrors = [];
        var caddy = await clientAPI.removeSelection(docDetailid, serverErrors);
        if (caddy) {
            cbDisplayCaddy(caddy);
        } else {
            cbDisplayErrors(serverErrors);
        }
    } catch (errorAPI) {
        cbDisplayErrors(errorAPI);
    }

}