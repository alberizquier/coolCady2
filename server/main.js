var mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const CoffeeShopsAPI = require('./API/CoffeeShopsAPI');
const DocDetailsAPI = require('./API/DocDetailsAPI');
const DocHeadersAPI = require('./API/DocHeadersAPI');
const ProductsAPI = require('./API/ProductsAPI');
const StocksAPI = require('./API/StocksAPI');
const VATsAPI = require('./API/VATsAPI');

var Seed = require('../server/Services/Seed');
var data = require('../server/data/data');

const Services = require('./Services/Services');
var services = new Services();

//#region CoffeeShops
const CoffeeShopDAO = require('./DAO/CoffeeShopDAO');
const CoffeeShopDTO = require('./DTO/CoffeeShopDTO');
const FullCoffeeShopDTO = require('./DTO/FullCoffeeShopDTO');
const CoffeeShopsService = require('./Services/CoffeeShopsService');
services.DAO.CoffeeShopDAO = CoffeeShopDAO;
services.DTO.CoffeeShopDTO = CoffeeShopDTO;
services.DTO.FullCoffeeShopDTO = FullCoffeeShopDTO;
//#endregion

//#region DocHeader
const DocHeaderDAO = require('./DAO/DocHeaderDAO');
const DocHeaderDTO = require('./DTO/DocHeaderDTO');
const FullDocHeaderDTO = require('./DTO/FullDocHeaderDTO');
const DocHeadersService = require('./Services/DocHeadersService');
services.DAO.DocHeaderDAO = DocHeaderDAO;
services.DTO.DocHeaderDTO = DocHeaderDTO;
services.DTO.FullDocHeaderDTO = FullDocHeaderDTO;
//#endregion

//#region DocDetail
const DocDetailDAO = require('./DAO/DocDetailDAO');
const DocDetailDTO = require('./DTO/DocDetailDTO');
const FullDocDetailDTO = require('./DTO/FullDocDetailDTO');
const DocDetailsService = require('./Services/DocDetailsService');
services.DAO.DocDetailDAO = DocDetailDAO;
services.DTO.DocDetailDTO = DocDetailDTO;
services.DTO.FullDocDetailDTO = FullDocDetailDTO;
//#endregion

//#region KindProduct
const KindProductDAO = require('./DAO/KindProductDAO');
const KindProductDTO = require('./DTO/KindProductDTO');
const FullKindProductDTO = require('./DTO/FullKindProductDTO');
const KindProductsService = require('./Services/KindProductsService');
services.DAO.KindProductDAO = KindProductDAO;
services.DTO.KindProductDTO = KindProductDTO;
services.DTO.FullKindProductDTO = FullKindProductDTO;
//#endregion

//#region Stock
const StockDAO = require('./DAO/StockDAO');
const StockDTO = require('./DTO/StockDTO');
const FullStockDTO = require('./DTO/FullStockDTO');
const StocksService = require('./Services/StocksService');
services.DAO.StockDAO = StockDAO;
services.DTO.StockDTO = StockDTO;
services.DTO.FullStockDTO = FullStockDTO;
//#endregion

//#region Products
const ProductDAO = require('./DAO/ProductDAO');
const ProductDTO = require('./DTO/ProductDTO');
const FullProductDTO = require('./DTO/FullProductDTO');
const ProductsService = require('./Services/ProductsService');
services.DAO.ProductDAO = ProductDAO;
services.DTO.ProductDTO = ProductDTO;
services.DTO.FullProductDTO = FullProductDTO;
//#endregion

//#region User
const UserDAO = require('./DAO/UserDAO');
const UserDTO = require('./DTO/UserDTO');
const FullUserDTO = require('./DTO/FullUserDTO');
const UsersService = require('./Services/UsersService');
services.DAO.UserDAO = UserDAO;
services.DTO.UserDTO = UserDTO;
services.DTO.FullUserDTO = FullUserDTO;
//#endregion

//#region VAT
const VATDAO = require('./DAO/VATDAO');
const VATDTO = require('./DTO/VATDTO');
const FullVATDTO = require('./DTO/FullVATDTO');
const VATsService = require('./Services/VATsService');
services.DAO.VATDAO = VATDAO;
services.DTO.VATDTO = VATDTO;
services.DTO.FullVATDTO = FullVATDTO;
//#endregion

//#region Services
services.services.coffeeShopsService = new CoffeeShopsService(services);
services.services.docDetailsService = new DocDetailsService(services);
services.services.docHeadersService = new DocHeadersService(services);

services.services.kindProductsService = new KindProductsService(services);
services.services.stocksService = new StocksService(services);
services.services.productsService = new ProductsService(services);
services.services.usersService = new UsersService(services);
services.services.vatsService = new VATsService(services);
//#endregion

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());

//#region APIS
const vatsAPI = new VATsAPI('/api', app, services.services);
const productsAPI = new ProductsAPI('/api', app, services.services);
const coffeeShopsAPI = new CoffeeShopsAPI('/api',app,services.services);
const stocksAPI = new StocksAPI('/api',app,services.services)
const docHeadersAPI = new DocHeadersAPI('/api',app,services.services)
const docDetailsAPI = new DocDetailsAPI('/api',app,services.services)
//#endregion

async function appInit() {
    console.log("Server listening on port 3000");
    await app.listen(3000);

}

async function startApp() {
    try {
        app._router.stack.forEach(function (r) {
            if (r.route && r.route.path) {
                console.log(r.route.path)
            }
        })
        let dbName = 'coolCaddy';
        if(process.argv.includes('test')){
            dbName = 'coolCaddyTest';
            console.log('Test Mode');
        }
        const connection = await mongoose.connect(`mongodb://localhost/${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Mongoose Connected!");
        appInit();
    } catch (error) {
        console.log("Couldn't connect to Mongoose/coolCaddy");
    }
}
startApp();