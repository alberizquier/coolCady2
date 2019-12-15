//crear una function que devuelva un array de tiendas y dentro de cada una un array de productos que nos devuelva el producto y el precio de venta en esa tienda. 
var mongoose = require('mongoose');
const ProductDAO = require('../DAO/ProductDAO');
const CoffeeShopDAO = require('../DAO/CoffeeShopDAO');
const StockDAO = require('../DAO/StockDAO');
const DocHeaderDAO = require('../DAO/DocHeaderDAO');
const DocDetailDAO = require('../DAO/DocDetailDAO');

//#region GetData

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
    let result = {};
    let docHeaderDAO = await DocHeaderDAO.findById(id);
    if (docHeaderDAO) {
        result.id = docHeaderDAO._id;
        result.coffeeShopId = docHeaderDAO.coffeeShopId;
        result.coffeeShop = {};
        let coffeeShopDAO = await CoffeeShopDAO.findById(docHeaderDAO.coffeeShopId);
        if (coffeeShopDAO) {
            result.coffeeShop.name = coffeeShopDAO.displayName;
            result.coffeeShop.address = coffeeShopDAO.address;
            result.coffeeShop.pictureURL = coffeeShopDAO.pictureURL;
            result.coffeeShop.description = coffeeShopDAO.description;
        }
        result.products = [];
        let docDetailsDAO = await DocDetailDAO.find({
            docHeaderId: docHeaderDAO._id
        });
        if (docDetailsDAO) {
            for (let docDetailDAO of docDetailsDAO) {
                let product = {};
                product.docDetailId = docDetailDAO._id;
                product.productId = docDetailDAO.productId;

                let productDAO = await ProductDAO.findById(docDetailDAO.productId);
                if (productDAO) {
                    product.name = productDAO.displayName;
                    product.ingredients = productDAO.ingredients;
                }
                product.price = docDetailDAO.price;
                product.quantity = docDetailDAO.quantity;
                result.products.push(product);
            }
        }

        result.totalItems = docHeaderDAO.totalItems;
        result.taxBaseR = docHeaderDAO.taxBaseR;
        result.vatBaseR = docHeaderDAO.taxBaseR * docHeaderDAO.percentageBaseR;
        result.percentageBaseR = docHeaderDAO.percentageBaseR;
        result.totalDue = docHeaderDAO.totalDue;
    }
    return result;
}
//#endregion
//#region Actions
async function calculateTotals(docHeaderId) {
    //localizamos el headerDAO
    let docHeaderDAO = await DocHeaderDAO.findById(docHeaderId);
    if (docHeaderDAO) {
        //localizamos los detailsDAO(docHeaderDAO.id) asociados
        var docDetailsDAO = await DocDetailDAO.find({
            docHeaderId: docHeaderId
        });
        if (docDetailsDAO) {
            //Ponemos a 0 los totales
            docHeaderDAO.amountDue = 0;
            docHeaderDAO.amountPayed = 0;

            docHeaderDAO.taxBaseR = 0;
            docHeaderDAO.taxBaseS = 0;
            docHeaderDAO.taxBaseN = 0;
            docHeaderDAO.totalItems = 0;

            //recorremos todos los detalles
            for (let docDetailDAO of docDetailsDAO) {
                docHeaderDAO.totalItems += docDetailDAO.quantity;
                //vamos acumulando en taxBaseX += docDetailDAO.price * docDetailDAO.quantity;
                switch (docDetailDAO.vatKind) {
                    case "N":
                        docHeaderDAO.taxBaseN += docDetailDAO.price * docDetailDAO.quantity
                        break;
                    case "S":
                        docHeaderDAO.taxBaseS += docDetailDAO.price * docDetailDAO.quantity
                        break;
                    case "R":
                    default:
                        docHeaderDAO.taxBaseR += docDetailDAO.price * docDetailDAO.quantity
                        break;
                }
            }
            docHeaderDAO.amountDue =
                docHeaderDAO.taxBaseR * (1 + docHeaderDAO.percentageBaseR) +
                docHeaderDAO.taxBaseN * (1 + docHeaderDAO.percentageBaseN) +
                docHeaderDAO.taxBaseS * (1 + docHeaderDAO.percentageBaseS);
            //actualizamos headerDAO
            await docHeaderDAO.save();
            return true;
        }
    }
    return false;
}



async function clearCaddy(coffeeShopId) {
    let caddy = new DocHeaderDAO();
    caddy.coffeeShopId = coffeeShopId;
    caddy.year = 2019;
    caddy.docNumber = 0;
    caddy.docDate = new Date();
    caddy.sellerId = "";
    caddy.clientId = "";
    caddy.paymentMethod = "";
    caddy.paymentDoc = "";
    caddy.paymentAuth = "";
    caddy.docKind = "caddy";
    caddy.docState = "open";
    caddy.taxBaseS = 0;
    caddy.taxBaseR = 0;
    caddy.taxBaseN = 0;
    caddy.percentageBaseS = 0;
    caddy.percentageBaseR = 0;
    caddy.percentageBaseN = 0;
    caddy.percentageDiscount = 0;
    caddy.amountDue = 0;
    caddy.amountPayed = 0;
    try {
        await caddy.save();
        return await getCaddy(caddy._id);
    } catch (error) {
        console.log('error en clearCaddy()', error.message);
        return null;
    }

}

async function addToCaddy(caddyId, productId, quantity, price) {
    try {
        let docDetailDAO;
        let docDetailsDAO = await DocDetailDAO.find({
            docHeaderId: caddyId,
            productId: productId
        });
        if (docDetailsDAO) {
            if (docDetailsDAO.length == 0) {
                docDetailDAO = new DocDetailDAO();
                docDetailDAO.docHeaderId = caddyId;
                docDetailDAO.productId = productId;
                let productDAO = await ProductDAO.findById(docDetailDAO.productId);
                if (productDAO) {
                    docDetailDAO.title = productDAO.displayName;
                    docDetailDAO.ingredients = productDAO.ingredients;
                }
                docDetailDAO.quantity = quantity;
                docDetailDAO.price = price;
                docDetailDAO.percentageDiscount = 0;
                docDetailDAO.vatKind = "R";
            } else {
                docDetailDAO = docDetailsDAO[0];
                docDetailDAO.quantity += quantity;
            }
            await docDetailDAO.save();
            await calculateTotals(caddyId);
            return await getCaddy(caddyId);
        }

    } catch (error) {
        console.log('error en addToCaddy()', error.message);
        return null;
    }
    return null;
}

async function removeFromCaddy(caddyId, productId, quantity) {
    try {
        let docDetailDAO;
        let docDetailsDAO = await DocDetailDAO.find({
            docHeaderId: caddyId,
            productId: productId
        });
        if (docDetailsDAO) {
            if (docDetailsDAO.length > 0) {
                let docDetailDAO = docDetailsDAO[0];
                let tmp = docDetailDAO.quantity - quantity;
                if (tmp <= 0) {
                    await DocDetailDAO.deleteOne({
                        _id: docDetailDAO._id
                    });
                } else {
                    docDetailDAO.quantity = tmp;
                    await docDetailDAO.save();
                }

            } else {

            }
            await calculateTotals(caddyId);
            return await getCaddy(caddyId);
        }

    } catch (error) {
        console.log('error en removeFromCaddy()', error.message);
        return null;
    }
    return null;
}

async function removeSelectionFromCaddy(caddyId, docDetailid) {
    try {
        let docDetailDAO = await DocDetailDAO.findById(docDetailid);
        if (docDetailDAO) {
            await DocDetailDAO.deleteOne({
                _id: docDetailDAO._id
            });
        }
        await calculateTotals(caddyId);
        return await getCaddy(caddyId);
    } catch (error) {
        console.log('error en removeSelectionFromCaddy()', error.message);
        return null;
    }
    return null;
}
//#endregion
async function app() {
    try {
        const connection = await mongoose.connect('mongodb://localhost/coolCaddy', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Mongoose Connected!");
        //var shops = await getShops();
        // console.log(JSON.stringify(shops, null, 4));
        // var caddy = await getCaddy('5df56f753b1ddf3902664ccc');
        // console.log(JSON.stringify(caddy, null, 4));
        console.log('---------TestClear Caddy()-------------');
        var caddy = await clearCaddy('5df167a143121e1f7c2c9756');
        console.log(JSON.stringify(caddy, null, 4));
        console.log('---------Test addToCaddy()-------------');
        caddy = await addToCaddy(caddy.id, '5df167a143121e1f7c2c9757', 7, 32.50);
        console.log(JSON.stringify(caddy, null, 4));
        console.log('---------Test Twice addToCaddy()-------------');
        caddy = await addToCaddy(caddy.id, '5df167a143121e1f7c2c9757', 3, 32.50);
        console.log(JSON.stringify(caddy, null, 4));
        console.log('---------Test removeFromCaddy()-------------');
        caddy = await removeFromCaddy(caddy.id, "5df167a143121e1f7c2c9757", 5);
        console.log(JSON.stringify(caddy, null, 4));
        console.log('---------Test Twice removeFromCaddy()-------------');
        caddy = await removeFromCaddy(caddy.id, "5df167a143121e1f7c2c9757", 7);
        console.log(JSON.stringify(caddy, null, 4));
        console.log('---------Test removeSelection() Before-------------');
        caddy = await addToCaddy(caddy.id, '5df167a143121e1f7c2c9757', 7, 32.50);
        console.log(JSON.stringify(caddy, null, 4));
        console.log('---------Test removeSelection() After-------------');
        caddy = await removeSelectionFromCaddy(caddy.id, caddy.products[0].docDetailId);
        console.log(JSON.stringify(caddy, null, 4));

    } catch (error) {
        console.log("Couldn't connect to Mongoose/coolCaddy", error);
    }
}

app();