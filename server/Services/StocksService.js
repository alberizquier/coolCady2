const CrudService = require('./CrudService');
const StockDAO = require('../DAO/StockDAO');
const StockDTO = require('../DTO/StockDTO');
const FullStockDTO = require('../DTO/FullStockDTO');

class StockService extends CrudService {
    constructor(services) {
        super("StockService", StockDAO, StockDTO, FullStockDTO, services);
    }


    async fillFieldsFullDTO(fullStockDTO, errors) {
        fullStockDTO.coffeeShop = await this.loadStockCofeeShop(fullStockDTO.coffeeShopId, errors)
        fullStockDTO.product = await this.loadStockProduct(fullStockDTO.productId, errors)
        return fullStockDTO;
    }

    async loadStockCofeeShop(id, errors) {
        return await this.services.coffeeShopsServices.readOne(id, errors);
    }

    async loadStockProduct(id, errors) {
        return await this.services.productsService.readOne(id, errors);
    }

    async checkFieldsId(stockDTO, errors) {
        var ok = true;
        var coffeeShopDAO = await this.DAO.CoffeeShopDAO.findById(stockDAO.coffeeShopId);
        if (!coffeeShopDAO) {
            ok = false;
            errors.push(`${this.nameService}.checkFieldsId(): coffeeShopId "${stockDTO.coffeeShopId}" not found`);
        }
        var productDAO = await this.DAO.ProductDAO.findById(stockDAO.productId);
        if (!productDAO) {
            ok = false;
            errors.push(`${this.nameService}.checkFieldsId(): productId "${stockDTO.productId}" not found`);
        }
        return ok;
    }


    async canCreateOne(stockDTO, errors) {
        console.log(`${this.nameService}.canCreateOne(${stockDTO.kind}): enters`);
        if (await super.canCreateOne(stockDTO, errors)) {
            var stocksByCoffeeShopProduct = await this.findStocksByCoffeeShopProduct(stockDTO.coffeeShopId, stockDTO.productId, errors);
            if (stocksByCoffeeShopProduct) {
                if (stocksByCoffeeShopProduct.length == 0) {
                    return true;
                }
                errors.push(`${this.nameService}.canCreateOne(): CoffeeShopProduct duplicated`);
            }
        }
        return false;
    }

    async findStocksByCoffeeShopProduct(coffeeShopId, productId, errors) {
        let stocksDTO = [];
        let stocksDAO = await this.DAO.StockDAO.find({
            coffeeShopId: coffeeShopId,
            productId: productId
        });
        if (stocksDAO) {
            for (let stockDAO of stocksDAO) {
                let stockDTO = new this.DTO.StockDTO();
                stocksDTO.push(stockDTO.fromDAO(stockDAO));
            }
        }
        return stocksDTO;
    }

    async canUpdateOne(stockDTO, errors) {
        if (await super.canUpdateOne(stockDTO, errors)) {
            var stocksByCoffeeShopProduct = await this.findStocksByCoffeeShopProduct(stockDTO.coffeeShopId, stockDTO.productId, errors);
            if (stocksByCoffeeShopProduct) {
                if (stocksByCoffeeShopProduct.length == 0) {
                    return true;
                }
                if (stocksByCoffeeShopProduct.length == 1) {
                    return stocksByCoffeeShopProduct[0].id == stockDTO.id;
                }
            }
        }
        return false;
    }

}
module.exports = StockService;