//crear una function que devuelva un array de tiendas y dentro de cada una un array de productos que nos devuelva el producto y el precio de venta en esa tienda. 
var mongoose = require('mongoose');
const ProductDAO = require('../DAO/ProductDAO');
const CoffeeShopDAO = require('../DAO/CoffeeShopDAO');
const StockDAO = require('../DAO/StockDAO');
const DocHeaderDAO = require('../DAO/DocHeaderDAO');
const DocDetailDAO = require('../DAO/DocDetailDAO');



async function getShops() {
    let shops = [];
    let shopsDAO = await CoffeeShopDAO.find({});
    for (let shopDAO of shopsDAO) {
        let shop = {
            displayName: shopDAO.displayName,
            address: shopDAO.address,
            products: []
        };
        let stocksDAO = await StockDAO.find({
            coffeeShopId: shopDAO._id
        });
        for (let stockDAO of stocksDAO) {
            let productDAO = await ProductDAO.findById(stockDAO.productId);
            if (productDAO) {
                let product = {

                    displayName: productDAO.displayName,
                    price: stockDAO.priceSell,
                    stock: stockDAO.quantityAcc - stockDAO.quantityCon,
                    ingredients: productDAO.ingredients
                };
                shop.products.push(product);
            }
        }
        shops.push(shop);

    }
    return shops;
}

function showShops(shops) {
    for (let shop of shops) {
        console.log('-----------');
        console.log(`shop.DisplayName: ${shop.displayName}`);
        console.log(`shop.address: ${shop.address}`);
        console.log('   Products: ');
        console.log('   -----------');
        for (let product of shop.products) {
            console.log(`  Product.displayName: ${product.displayName}`);
            console.log(`  Product.price: ${product.price}`);
            console.log(`  Product.stock: ${product.stock}`);
            console.log(`  Product.ingredients: ${product.ingredients}`);
            console.log('  -----------');
        }

    }

}

async function getCaddy(id) {
    let caddy = {};
    let caddyDAO = await DocHeaderDAO.findById(id);
    caddy.docDate = caddyDAO.docDate;
    caddy.taxBaseR = caddyDAO.taxBaseR;
    caddy.vatBaseR = caddyDAO.taxBaseR * caddyDAO.percentageBaseR;
    caddy.amountDue = caddyDAO.amountDue;
    caddy.totalItems = caddyDAO.totalItems;
    return caddy;
}


async function app() {
    try {

        const connection = await mongoose.connect('mongodb://localhost/coolCaddy', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Mongoose Connected!");
        var shops = await getShops();
        console.log(JSON.stringify(shops, null, 4));
        var caddy = await getCaddy('5df56f753b1ddf3902664ccc');
        console.log(JSON.stringify(caddy,null,4));
    } catch (error) {
        console.log("Couldn't connect to Mongoose/coolCaddy", error);
    }
}

app();