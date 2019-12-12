const CrudService = require('./CrudService');
const ProductDAO = require('../DAO/ProductDAO');
const ProductDTO = require('../DTO/ProductDTO');
const FullProductDTO = require('../DTO/FullProductDTO');

class ProductService extends CrudService {
    constructor(services) {
        super("ProductService", ProductDAO, ProductDTO, FullProductDTO, services);
    }

    async fillFieldsFullDTO(fullProductDTO, errors) {
        fullProductDTO.vat = await this.loadProductVAT(fullProductDTO.vatKind, errors);
        fullProductDTO.stocks = await this.loadProductStocks(fullProductDTO.id, errors);
        return fullProductDTO;
    }

    async loadProductVAT(vatKind, errors) {
        let filter = {
            kind: vatKind
        };
        let vatsDTO = await this.services.vatsService.readAll(filter,errors); 
        if(vatsDTO){
            if(vatsDTO.length > 0){
                return vatsDTO[0];
            }
        }
        else{
            return null;
        }
    }

    async loadProductStocks(productId, errors) {
        let result = [];
        let filter = {
            productId: productId
        };
        var stocksDTO = await this.services.stocksService.readAll(filter, errors);
        if (stocksDTO) {
            for (let stockDTO of stocksDTO) {
                let fullStockDTO = await this.services.stocksService.readFullOne(stockDTO.id, errors);
                if (fullStockDTO) {
                    result.push(fullStockDTO);
                }
            }
        }
        return result;
    }

    async canCreateOne(productDTO, errors) {
        console.log(`${this.nameService}.canCreateOne(${productDTO.name}): enters`);
        if (await super.canCreateOne(productDTO, errors)) {
            var productsByName = await this.findProductsByName(productDTO.name, errors);
            if (productsByName) {
                if (productsByName.length == 0) {
                    return true;
                }
                errors.push(`${this.nameService}.canCreateOne(): Name "${productDTO.name}" duplicated`);
            }
        }
        return false;
    }

    async findProductsByName(name, errors) {
        let productsDTO = [];
        let productsDAO = await this.DAO.ProductDAO.find({
            name: name
        });
        if (productsDAO) {
            for (let productDAO of productsDAO) {
                let productDTO = new this.DTO.ProductDTO();
                productsDTO.push(productDTO.fromDAO(productDAO));
            }
        }
        return productsDTO;
    }

    async canDeleteOne(productId, errors) {
        var hasStocks = false;
        //Find Stocks
        var stocks = await this.DAO.StockDAO.find({
            productId: productId
        }).limit(1);
        if (stocks) {
            hasStocks = stocks.length > 0;
            if (hasStocks) {
                errors.push(`${this.nameService}.canDelete(): the product has Stocks associated`);
            }
        }
        //other relations

        //end verificaton
        return !hasStocks;
    }


    async canUpdateOne(productDTO, errors) {
        if (await super.canUpdateOne(productDTO, errors)) {
            var productsByName = await this.findProductsByName(productDTO.name, errors);
            if (productsByName) {
                if (productsByName.length == 0) {
                    return true;
                }
                if (productsByName.length == 1) {
                    return productsByName[0].id == productDTO.id;
                }
            }
        }
        return false;
    }

}
module.exports = ProductService;