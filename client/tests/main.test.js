import {
    ClientAPIMock
} from "./ClientAPI.mock";
import {
    Main
} from "../main.js";


class Context {
    constructor() {
        this.main = new Main(new ClientAPIMock('localhost', '3000', 'api'));
        this.coffeeShops = null;
        this.coffeeShop = null;
        this.errors = null;
        this.caddy = null;
        this.order = null;
    }
}

var context = null;

async function cbDisplayCoffeeShops(coffeeShops) {
    context.coffeeShops = coffeeShops;
}

async function cbDisplayCoffeeShop(coffeeShop) {
    context.coffeeShop = coffeeShop;
}

async function cbDisplayErrors(errors) {
    context.errors = errors;
}

async function cbDisplayOrder(order) {
    context.order = order;
}

async function cbDisplayCaddy(caddy) {
    context.caddy = caddy;
}
describe('Refresh', () => {
    test('refreshCoffeeShops', async () => {
        context = new Context();
        await context.main.refreshCoffeeShops(cbDisplayCoffeeShops, cbDisplayErrors);
        expect(context.coffeeShops.length).toBe(4);
    });

    test('refreshCoffeeShop', async () => {
        context = new Context();
        await context.main.refreshCoffeeShops(cbDisplayCoffeeShops, cbDisplayErrors);
        var coffeeShopId = context.coffeeShops[0].id;
        await context.main.refreshCoffeeShop(coffeeShopId, cbDisplayCoffeeShop, cbDisplayErrors);
        expect(context.coffeeShop.id).toBe(coffeeShopId);
    });
});

describe('Caddy', () => {
    test('newCaddy', async () => {
        context = new Context();
        await context.main.refreshCoffeeShops(cbDisplayCoffeeShops, cbDisplayErrors);
        var coffeeShopId = context.coffeeShops[0].id;
        await context.main.newCaddy(coffeeShopId, cbDisplayCaddy, cbDisplayErrors);
        expect(context.errors).toBe(null);
        expect(context.caddy.coffeeShopId).toBe(coffeeShopId);
        expect(context.caddy.docState).toBe("open");
        expect(context.caddy.docDetails.length).toBe(0);
        expect(context.caddy.amountDue).toEqual(0);
    });
    test('closeCaddy', async () => {
        context = new Context();
        await context.main.refreshCoffeeShops(cbDisplayCoffeeShops, cbDisplayErrors);
        var coffeeShopId = context.coffeeShops[0].id;
        await context.main.newCaddy(coffeeShopId, cbDisplayCaddy, cbDisplayErrors);
        await context.main.closeCaddy(context.caddy.id, cbDisplayOrder, cbDisplayErrors);
        expect(context.errors).toBe(null);
        expect(context.order.docState).toBe("close");
    });
    test('addProduct', async () => {
        context = new Context();
        await context.main.refreshCoffeeShops(cbDisplayCoffeeShops, cbDisplayErrors);
        var coffeeShopId = context.coffeeShops[0].id;
        await context.main.refreshCoffeeShop(coffeeShopId, cbDisplayCoffeeShop, cbDisplayErrors);
        expect(context.coffeeShop.stocks.length).toBeGreaterThan(0);
        await context.main.newCaddy(coffeeShopId, cbDisplayCaddy, cbDisplayErrors);
        let caddyId = context.caddy.id;
        let productId = context.coffeeShop.stocks[0].productId;
        let quantity = 7;
        let price = context.coffeeShop.stocks[0].priceSell;
        await context.main.addProduct(caddyId, productId, quantity, price, cbDisplayCaddy, cbDisplayErrors);
        expect(context.errors).toBe(null);
        expect(context.caddy.docState).toBe("open");
        expect(context.caddy.docDetails.length).toBeGreaterThan(0);
        expect(context.caddy.docDetails[0].productId).toBe(productId);
        expect(context.caddy.docDetails[0].price).toBe(price);
        expect(context.caddy.docDetails[0].quantity).toBe(quantity);
        let amountDue = (price * quantity) * (1 + 0.1);
        expect(context.caddy.amountDue).toBe(amountDue);
        await context.main.addProduct(caddyId, productId, quantity, price, cbDisplayCaddy, cbDisplayErrors);
        expect(context.caddy.docDetails.length).toBe(1);
        expect(context.caddy.docDetails[0].quantity).toBe(quantity * 2);
        expect(context.caddy.amountDue).toBe(amountDue * 2);
        await context.main.removeProduct(caddyId, productId, quantity, cbDisplayCaddy, cbDisplayErrors);
        expect(context.caddy.docDetails[0].quantity).toBe(quantity);
        expect(context.caddy.amountDue).toBe(amountDue);
        await context.main.removeProduct(caddyId, productId, quantity * 2, cbDisplayCaddy, cbDisplayErrors);
        expect(context.caddy.docDetails.length).toBe(0);

    });
    test('Remove product', async (done) => {
        context = new Context();
        await context.main.refreshCoffeeShops(cbDisplayCoffeeShops, cbDisplayErrors);
        var coffeeShopId = context.coffeeShops[0].id;
        await context.main.refreshCoffeeShop(coffeeShopId, cbDisplayCoffeeShop, cbDisplayErrors);
        expect(context.coffeeShop.stocks.length).toBeGreaterThan(0);
        await context.main.newCaddy(coffeeShopId, cbDisplayCaddy, cbDisplayErrors);
        let caddyId = context.caddy.id;
        let productId = context.coffeeShop.stocks[0].productId;
        let quantity = 7;
        let price = context.coffeeShop.stocks[0].priceSell;
        await context.main.addProduct(caddyId, productId, quantity, price, cbDisplayCaddy, cbDisplayErrors);
        expect(context.errors).toBe(null);
        expect(context.caddy.docState).toBe("open");
        expect(context.caddy.docDetails.length).toBeGreaterThan(0);
        expect(context.caddy.docDetails[0].productId).toBe(productId);
        expect(context.caddy.docDetails[0].price).toBe(price);
        expect(context.caddy.docDetails[0].quantity).toBe(quantity);
        let amountDue = (price * quantity) * (1 + 0.1);
        expect(context.caddy.amountDue).toBe(amountDue);
        await context.main.addProduct(caddyId, productId, quantity, price, cbDisplayCaddy, cbDisplayErrors);
        expect(context.caddy.docDetails.length).toBe(1);
        expect(context.caddy.docDetails[0].quantity).toBe(quantity * 2);
        expect(context.caddy.amountDue).toBe(amountDue * 2);
        await context.main.removeProduct(caddyId, productId, quantity, cbDisplayCaddy, cbDisplayErrors);
        expect(context.caddy.docDetails[0].quantity).toBe(quantity);
        expect(context.caddy.amountDue).toBe(amountDue);
        await context.main.removeProduct(caddyId, productId, quantity * 2, cbDisplayCaddy, cbDisplayErrors);
        expect(context.caddy.docDetails.length).toBe(0);
        await context.main.removeProduct(caddyId, productId, quantity, cbDisplayCaddy, cbDisplayErrors);
        expect(context.caddy.docDetails.length).toBe(0);
        done();
    });
    test('Remove Selection', async () => {
        context = new Context();
        await context.main.refreshCoffeeShops(cbDisplayCoffeeShops, cbDisplayErrors);
        var coffeeShopId = context.coffeeShops[0].id;
        await context.main.refreshCoffeeShop(coffeeShopId, cbDisplayCoffeeShop, cbDisplayErrors);
        await context.main.newCaddy(coffeeShopId, cbDisplayCaddy, cbDisplayErrors);
        let caddyId = context.caddy.id;
        let productId = context.coffeeShop.stocks[0].productId;
        let quantity = 7;
        let price = context.coffeeShop.stocks[0].priceSell;
        await context.main.addProduct(caddyId, productId, quantity, price, cbDisplayCaddy, cbDisplayErrors);
        await context.main.addProduct(caddyId, productId, quantity, price, cbDisplayCaddy, cbDisplayErrors);
        expect(context.caddy.docDetails.length).toBe(1);
        let docDetailId = context.caddy.docDetails[0].id;
        await context.main.removeSelection(docDetailId, cbDisplayCaddy, cbDisplayErrors);
        expect(context.caddy.docDetails.length).toBe(0);
    });
});