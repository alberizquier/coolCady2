const CrudService = require('./CrudService');
const CoffeeShopDAO = require('../DAO/CoffeeShopDAO');
const CoffeeShopDTO = require('../DTO/CoffeeShopDTO');
const FullCoffeeShopDTO = require('../DTO/FullCoffeeShopDTO');

class CoffeeShopService extends CrudService {
    constructor(services) {
        super("CoffeeShopService", CoffeeShopDAO, CoffeeShopDTO, FullCoffeeShopDTO, services);
    }


    async canCreateOne(coffeeShopDTO, errors) {
        console.log(`${this.nameService}.canCreateOne(${coffeeShopDTO.name}): enters`);
        if (await super.canCreateOne(coffeeShopDTO, errors)) {
            var coffeeShopsByName = await this.findCoffeeShopsByName(coffeeShopDTO.name, errors);
            if (coffeeShopsByName) {
                if (coffeeShopsByName.length == 0) {
                    return true;
                }
                errors.push(`${this.nameService}.canCreateOne(): Name "${coffeeShopDTO.name}" duplicated`);
            }
        }
        return false;
    }

    async findCoffeeShopsByName(name, errors) {
        let coffeeShopsDTO = [];
        let coffeeShopsDAO = await this.DAO.CoffeeShopDAO.find({
            name: name
        });
        if (coffeeShopsDAO) {
            for (let coffeeShopDAO of coffeeShopsDAO) {
                let coffeeShopDTO = new this.DTO.CoffeeShopDTO();
                coffeeShopsDTO.push(coffeeShopDTO.fromDAO(coffeeShopDAO));
            }
        }
        return coffeeShopsDTO;
    }

    async canDeleteOne(coffeeShopId, errors) {
        var hasStocks = false;
        //Find Stocks
        var stocks = await this.DAO.CoffeeShopDAO.find({ coffeeShopId: coffeeShopId }).limit(1);
        if (stocks) {
            hasStocks = stocks.length > 0;
            if (hasStocks) {
                errors.push(`${this.nameService}.canDelete(): the coffeeShop has Stocks associated`);
            }
        }
        //other relations

        //end verificaton
        return !hasStocks;
    }



    async canUpdateOne(coffeeShopDTO, errors) {
        if (await super.canUpdateOne(coffeeShopDTO, errors)) {
            var coffeeShopsByName = await this.findCoffeeShopsByName(coffeeShopDTO.name, errors);
            if (coffeeShopsByName) {
                if (coffeeShopsByName.length == 0) {
                    return true;
                }
                if (coffeeShopsByName.length == 1) {
                    return coffeeShopsByName[0].id == coffeeShopDTO.id;
                }
            }
        }
        return false;
    }

}
module.exports = CoffeeShopService;