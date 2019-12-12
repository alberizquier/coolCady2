class ProductContext {
    constructor() {
        this.mongoose = require('mongoose');
        this.Services = require('../../Services/Services');
        this.ProductsService = require('../../Services/ProductsService');

        this.services = new this.Services();
        this.services.DAO.ProductDAO = require('../../DAO/ProductDAO');
        this.services.DTO.ProductDTO = require('../../DTO/ProductDTO');
        this.services.DAO.FullProductDTO = require('../../DTO/FullProductDTO');

        this.services.services.productsService = new this.ProductsService(this.services);

        this.productsService = this.services.services.productsService;
    }

    async connect(host, dbName) {
        this.connection = await this.mongoose.connect(`mongodb://${host}/${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 4000
        });
        return this.connection;
    }

    async clearContextData() {
        if (this.connection) {
            let productsDAO = await this.services.DAO.ProductDAO.find();
            if (productsDAO) {
                for (let productDAO of productsDAO) {
                    await this.services.DAO.ProductDAO.deleteOne({
                        _id: productDAO._id
                    });
                }
            }
        }
    }

}

test('After clearing contextDB no record is found', async () => {
    let context = new ProductContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        await context.clearContextData();
        var errors = [];
        let productsDTO = await context.productsService.readAll({}, errors);
        expect(productsDTO.length).toBe(0);
    }
});

test('Can create a new record', async () => {
    let context = new ProductContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        let productDTO = context.productsService.postModel();
        productDTO.name = "Cold Brew";
        productDTO.displayName = "Cold Brew";
        productDTO.kind = "Coffee";
        productDTO.subKind = "VILLA ROSITA – LIME";
        productDTO.ingredient = "Coffee";
        productDTO.priceCost = 3;
        productDTO.vatKind = "R";
        productDTO.remarks = "Special for caffeine addicts";
        productDTO.pictureURL = "coldBrew.png";

        var errors = [];
        let newProductDTO = await context.productsService.createOne(productDTO, errors);
        expect(newProductDTO).not.toBe(null);
        expect(newProductDTO.name).toBe("Cold Brew");
        expect(newProductDTO.displayName).toBe("Cold Brew");
        expect(newProductDTO.kind).toBe("Coffee");
        expect(newProductDTO.subKind).toBe("VILLA ROSITA – LIME");
        expect(newProductDTO.ingredient).toBe("Coffee");
        expect(newProductDTO.priceCost).toBe(3);
        expect(newProductDTO.vatKind).toBe("R");
        expect(newProductDTO.remarks).toBe("Special for caffeine addicts");
        expect(newProductDTO.pictureURL).toBe("coldBrew.png");
    }
});

test('Cannot duplicate a record', async () => {
    let context = new ProductContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let productDTO = context.productsService.model();
        productDTO.name = "Cold Brew";
        productDTO.displayName = "Cold Brew";
        productDTO.kind = "Coffee";
        productDTO.subKind = "VILLA ROSITA – LIME";
        productDTO.ingredient = "Coffee";
        productDTO.priceCost = 3;
        productDTO.vatKind = "R";
        productDTO.remarks = "Special for caffeine addicts";
        productDTO.pictureURL = "coldBrew.png";
        let newProductDTO = await context.productsService.createOne(productDTO, errors);
        expect(newProductDTO).toBe(null);
    }
});