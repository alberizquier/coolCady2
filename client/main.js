import {
    ClientAPI
} from './RestAPI/ClientAPI.js';

//Este modulo asocia la clientAPI con las funcciones de callBack que suministrará index.js
//FORBIDDEN poner document.getElementByID de nada AQUI!!!
//En el callback mandamos  los datos recibidos como parametro y el codigo de index.js los ha de asociar. 
var clientAPI = new ClientAPI('localhost', '3000', 'api');

export async function refreshCoffeeShops(cbCoffeeShops) {
    var errors = [];
    var coffeeShops = await clientAPI.getCoffeeShops(errors);
    if (coffeeShops) {
        //solo he de llamar a cbCoffeeShops una vez que he recibido correctamente los datos de todas los coffeeshops
        cbCoffeeShops(coffeeShops);
    }
}

export async function refreshCoffeeShop(cofeeShopId, cbCoffeeShop) {
    var errors = [];
    var coffeeShop = await clientAPI.getOneCoffeeShop(cofeeShopId, errors);
    if (coffeeShop) {
        cbCoffeeShop(coffeeShop);
    }
}


export async function newCaddy(cofeeShopId, cbCaddy) {
    var errors = [];
    var caddy = await clientAPI.newCaddy(cofeeShopId, errors);
    if (caddy) {
        cbCaddy(caddy);
    }
}

export async function askCaddy(caddyId,cbCaddy){
    var errors = [];
    var caddy = await clientAPI.askCaddy(caddyId, errors);
    if (caddy) {
        cbCaddy(caddy);
    }
}

export async function addProduct(caddyId,productId,quantity,price,cbCaddy){
    var errors = [];
    var caddy = await clientAPI.addProduct(caddyId,productId,quantity,price, errors);
    if (caddy) {
        cbCaddy(caddy);
    }
}

