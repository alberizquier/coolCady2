const CrudService = require('./CrudService');
const ProductDAO = require('../DAO/ProductDAO');
const ProductDTO = require('../DTO/ProductDTO');
const FullProductDTO = require('../DTO/FullProductDTO');

class ProductService extends CrudService {
    constructor(services) {
        super("ProductService", ProductDAO, ProductDTO, FullProductDTO, services);
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
        var stocks = await this.DAO.StockDAO.find({ productId: productId }).limit(1);
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