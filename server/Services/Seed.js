const CoffeeShopDAO = require('../DAO/CoffeeShopDAO');
const KindProductDAO = require('../DAO/KindProductDAO');
const ProductDAO = require('../DAO/ProductDAO');
const StockDAO = require('../DAO/StockDAO');
const UserDAO = require('../DAO/UserDAO');
const VATDAO = require('../DAO/VATDAO');



class Seed {
    constructor(data) {
        this.data = data;
    }

    async clearTable(tableDAO) {
        var records = await tableDAO.find();
        for (let record of records) {
            await tableDAO.deleteOne({
                _id: record._id
            });
        }
    }

    async seed() {
        await this.seedUsers();
        await this.seedVATs();
        await this.seedCoffeeShops();
    }


    async seedUser(email, password, isAdmin, pictureURL) {
        var userDAO = new UserDAO();
        userDAO.email = email;
        userDAO.password = password;
        userDAO.isAdmin = isAdmin;
        userDAO.isLocked = false;
        userDAO.pictureURL = pictureURL;
        userDAO.lastLogin = new Date();
        userDAO = await UserDAO.create(userDAO);
    }

    async seedUsers() {
        await this.unSeedUsers();
        await this.seedUser("admin@coolcaddy.com", "123", true, "admin.jpg");
        await this.seedUser("user@coolcaddy.com", "123", false, "user.jpg");
    }

    async unSeedUsers() {
        var Users = await UserDAO.find();
        for (let User of Users) {
            await UserDAO.deleteOne({
                _id: User._id
            });
        }
    }

    async seedVAT(kind, displayName, percentage) {
        var vatDAO = new VATDAO();
        vatDAO.kind = kind;
        vatDAO.displayName = displayName;
        vatDAO.percentage = percentage;
        vatDAO = await VATDAO.create(vatDAO);
    }

    async seedVATs() {
        await this.unSeedVATs();
        await this.seedVAT("R", "Reduced 10%", 0.1);
        await this.seedVAT("S", "Super Reduced 7%", 0.07);
        await this.seedVAT("N", "Normal 21%", 0.21);
    }

    async unSeedVATs() {
        var vats = await VATDAO.find();
        for (let vat of vats) {
            await VATDAO.deleteOne({
                _id: vat._id
            });
        }
    }

    async seedCoffeeShops() {
        console.log("seedCoffeeShops()");
        await this.clearTable(CoffeeShopDAO);
        await this.clearTable(KindProductDAO);
        await this.clearTable(ProductDAO);
        await this.clearTable(StockDAO);
        for (let coffeeShop of this.data) {
            //Buscamos todos los coffeeShops con el nombre que viene dado por el json
            let coffeeShopsDAO = await CoffeeShopDAO.find({
                "name": coffeeShop.name
            });
            if (coffeeShopsDAO) {
                //actualizamos / insertamos el coffeeShop
                let coffeeShopDAO;
                let create = false;
                if (coffeeShopsDAO.length == 0) {
                    coffeeShopDAO = new CoffeeShopDAO();
                    create = true;
                } else {
                    coffeeShopDAO = coffeeShopDAO[0];
                }
                coffeeShopDAO.name = coffeeShop.name;
                coffeeShopDAO.displayName = coffeeShop.name;
                coffeeShopDAO.address = "";
                coffeeShopDAO.pictureURL = coffeeShop.image;
                coffeeShopDAO.description = coffeeShop.description;
                if (create) {
                    coffeeShopDAO = await CoffeeShopDAO.create(coffeeShopDAO);
                } else {
                    coffeeShopDAO = await coffeeShopDAO.save();
                }
                //
                //Para cada uno de los dishes de cada tienda lo insertamos en la tabla de products; Y el la tabla de stocks
                for (let dish of coffeeShop.dishes) {
                    let productsDAO = await ProductDAO.find({
                        "name": dish.name
                    });
                    if (productsDAO) {
                        //actualizamos / insertamos el coffeeShop
                        let productDAO;
                        //Si no hay ningun product con ese nombre, lo creamos.
                        //Si ya hay uno lo actualizamos el primero de la lista.
                        if (productsDAO.length == 0) {
                            productDAO = new ProductDAO();
                            create = true;
                        } else {
                            productDAO = productsDAO[0];
                        }
                        //reemplazamos los campos del productDAO por los que me pasan en dish.
                        /*Dish
                        "name": "Cold Brew",
                        "type": "Coffe",
                        "kind": "VILLA ROSITA – LIME",
                        "notes": "lemon, ginger, lime cake",
                        "ingredients": "coffee",
                        "price": 3.50,
                        "img": "../assets/dishes/satans/coldBrew"
                        */
                        /*
                       ProductDAO:
                        name: String,
                        displayName: String,
                        kind: String,
                        subKind: String,
                        ingredients: String,
                        priceCost: Number,
                        vatKind: String,
                        remarks: String,
                        pictureURL: String
                       */
                        productDAO.name = dish.name;
                        productDAO.displayName = dish.name;
                        productDAO.kind = dish.type ? dish.type : "";
                        productDAO.subKind = dish.kind ? dish.kind : "";
                        productDAO.remarks = dish.notes;
                        productDAO.ingredients = dish.ingredients;
                        productDAO.vatKind = "R";
                        productDAO.priceCost = dish.price;
                        productDAO.pictureURL = dish.img;
                        //insertamos el registro en la base de datos
                        if (create) {
                            productDAO = await ProductDAO.create(productDAO);
                        } else {
                            productDAO = await productDAO.save();
                        }
                        //Pasamos a buscar el kind y subKind de cada product y lo insertamos si no existe
                        let filter = {
                            kind: productDAO.kind,
                            subKind: productDAO.subKind
                        };
                        let kindProductsDAO = await KindProductDAO.find(filter);
                        if (kindProductsDAO) {
                            if (kindProductsDAO.length == 0) {
                                //toca insertar
                                let kindProductDAO = new KindProductDAO();
                                kindProductDAO.kind = productDAO.kind;
                                kindProductDAO.subKind = productDAO.subKind;
                                kindProductDAO.description = "";
                                kindProductDAO = await KindProductDAO.create(kindProductDAO);
                            }
                        }
                        //Pasamos a buscar el stock de cada product y lo insertamos si no existe
                        filter = {
                            coffeeShopId: coffeeShopDAO._id,
                            productId: productDAO._id
                        };
                        let stocksDAO = await StockDAO.find(filter);
                        if (stocksDAO) {
                            if (stocksDAO.length == 0) {
                                //toca insertar
                                let stockDAO = new StockDAO();
                                stockDAO.coffeeShopId = coffeeShopDAO._id;
                                stockDAO.productId = productDAO._id;
                                stockDAO.quantityAcc = 0;
                                stockDAO.quantityCon = 0;
                                stockDAO.priceSell = productDAO.priceCost;
                                stockDAO = await StockDAO.create(stockDAO);
                            }
                        }
                    }
                }
            }
        }
    }

}
module.exports = Seed;