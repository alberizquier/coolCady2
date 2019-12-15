class CoffeeShopContext {
    constructor() {
        this.mongoose = require('mongoose');
        this.Services = require('../../Services/Services');
        this.CoffeeShopsService = require('../../Services/CoffeeShopsService');
        this.StocksService = require('../../Services/StocksService');
        this.ProductsService = require('../../Services/ProductsService');

        this.services = new this.Services();
        this.services.DAO.CoffeeShopDAO = require('../../DAO/CoffeeShopDAO');
        this.services.DTO.CoffeeShopDTO = require('../../DTO/CoffeeShopDTO');
        this.services.DAO.FullCoffeeShopDTO = require('../../DTO/FullCoffeeShopDTO');

        this.services.services.coffeeShopsService = new this.CoffeeShopsService(this.services);
        this.services.services.stocksService = new this.StocksService(this.services);
        this.services.services.productsService = new this.ProductsService(this.services);



        this.coffeeShopsService = this.services.services.coffeeShopsService;
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
            let coffeeShopsDAO = await this.services.DAO.CoffeeShopDAO.find();
            if (coffeeShopsDAO) {
                for (let coffeeShopDAO of coffeeShopsDAO) {
                    await this.services.DAO.CoffeeShopDAO.deleteOne({
                        _id: coffeeShopDAO._id
                    });
                }
            }
        }
    }

}

test('After clearing contextDB no record is found', async () => {
    let context = new CoffeeShopContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        await context.clearContextData();
        var errors = [];
        let coffeeShopsDTO = await context.coffeeShopsService.readAll({}, errors);
        expect(coffeeShopsDTO.length).toBe(0);
    }
});

test('Can create a new record', async () => {
    let context = new CoffeeShopContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        let coffeeShopDTO = context.coffeeShopsService.postModel();
        coffeeShopDTO.name = "Cafeteria 1";
        coffeeShopDTO.displayName = "Cafeteria 1";
        coffeeShopDTO.address = "Via de la inmaculada 1";
        coffeeShopDTO.pictureURL = "Cafeteria1.png";
        coffeeShopDTO.description = "Una cafeteria de churros";
        var errors = [];
        let newCoffeeShopDTO = await context.coffeeShopsService.createOne(coffeeShopDTO, errors);
        expect(newCoffeeShopDTO).not.toBe(null);
        expect(newCoffeeShopDTO.name).toBe("Cafeteria 1");
        expect(newCoffeeShopDTO.displayName).toBe("Cafeteria 1");
        expect(newCoffeeShopDTO.address).toBe("Via de la inmaculada 1");
        expect(newCoffeeShopDTO.pictureURL).toBe("Cafeteria1.png");
        expect(newCoffeeShopDTO.description).toBe("Una cafeteria de churros");
    }
});

test('Cannot duplicate a record', async () => {
    let context = new CoffeeShopContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        let coffeeShopDTO = context.coffeeShopsService.model();
        coffeeShopDTO.name = "Cafeteria 1";
        coffeeShopDTO.displayName = "Cafeteria 1";
        coffeeShopDTO.address = "Via de la inmaculada 1";
        coffeeShopDTO.pictureURL = "Cafeteria1.png";
        coffeeShopDTO.description = "Una cafeteria de churros";
        var errors = [];
        let newCoffeeShopDTO = await context.coffeeShopsService.createOne(coffeeShopDTO, errors);
        expect(newCoffeeShopDTO).toBe(null);
    }
});

test('can read a record', async () => {
    let context = new CoffeeShopContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let coffeeShopsDTO = await context.coffeeShopsService.findCoffeeShopsByName("Cafeteria 1", errors);
        expect(coffeeShopsDTO).not.toBe(null);
        expect(coffeeShopsDTO.length).toBe(1);
        expect(coffeeShopsDTO[0].name).toBe("Cafeteria 1");
        let coffeeShopDTO = await context.coffeeShopsService.readOne(coffeeShopsDTO[0].id, errors);
        expect(coffeeShopDTO).not.toBe(null);
        expect(coffeeShopDTO.id).toBe(coffeeShopsDTO[0].id);
    }
});

test('Can read a fullRecordDTO', async () => {
    let context = new CoffeeShopContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let coffeeShopsDTO = await context.coffeeShopsService.findCoffeeShopsByName("Cafeteria 1", errors);
        expect(coffeeShopsDTO).not.toBe(null);
        expect(coffeeShopsDTO.length).toBe(1);
        expect(coffeeShopsDTO[0].name).toBe("Cafeteria 1");
        errors = [];
        let coffeeShopDTO = await context.coffeeShopsService.readFullOne(coffeeShopsDTO[0].id, errors);
        expect(coffeeShopDTO).not.toBe(null);
        expect(coffeeShopDTO.id).toBe(coffeeShopsDTO[0].id);
    }
});

test('Cannot read a RecordDTO, id.value = dummy', async () => {
    let context = new CoffeeShopContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let id = context.mongoose.Types.ObjectId();
        let coffeeShopDTO = await context.coffeeShopsService.readOne(id, errors);
        expect(coffeeShopDTO).toBe(null);
    }
});

test('Cannot read a fullRecordDTO, id.value = dummy', async () => {
    let context = new CoffeeShopContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let id = context.mongoose.Types.ObjectId();
        let coffeeShopDTO = await context.coffeeShopsService.readFullOne(id, errors);
        expect(coffeeShopDTO).toBe(null);
    }
});

test('can update a record', async () => {
    let context = new CoffeeShopContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let coffeeShopsDTO = await context.coffeeShopsService.findCoffeeShopsByName("Cafeteria 1", errors);
        expect(coffeeShopsDTO).not.toBe(null);
        expect(coffeeShopsDTO.length).toBe(1);
        expect(coffeeShopsDTO[0].name).toBe("Cafeteria 1");
        let coffeeShopDTO = coffeeShopsDTO[0];
        coffeeShopDTO.name = "Cafeteria 2";
        let updatedCoffeeShopDTO = await context.coffeeShopsService.updateOne(coffeeShopDTO, coffeeShopDTO.id, errors);
        expect(updatedCoffeeShopDTO).not.toBe(null);
        expect(updatedCoffeeShopDTO.displayName).toBe("Cafeteria 1");
    }
});

test('cannot update a record with a dummyId', async () => {
    let context = new CoffeeShopContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let coffeeShopsDTO = await context.coffeeShopsService.findCoffeeShopsByName("Cafeteria 2", errors);
        expect(coffeeShopsDTO).not.toBe(null);
        expect(coffeeShopsDTO.length).toBe(1);
        expect(coffeeShopsDTO[0].name).toBe("Cafeteria 2");
        let coffeeShopDTO = coffeeShopsDTO[0];
        let dummyId = context.mongoose.Types.ObjectId();
        let updatedCoffeeShopDTO = await context.coffeeShopsService.updateOne(coffeeShopDTO, dummyId, errors);
        expect(updatedCoffeeShopDTO).toBe(null);
    }
});

test('Cannot update twice the same record', async () => {
    let context = new CoffeeShopContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let coffeeShopsDTO = await context.coffeeShopsService.findCoffeeShopsByName("Cafeteria 2", errors);
        expect(coffeeShopsDTO).not.toBe(null);
        expect(coffeeShopsDTO.length).toBe(1);
        expect(coffeeShopsDTO[0].name).toBe("Cafeteria 2");

        let coffeeShopDTO = coffeeShopsDTO[0];
        let newCoffeeShopDTO = context.coffeeShopsService.putModel();
        //copiamos todos los valores que tenemos en coffeeShopDTO
        newCoffeeShopDTO.id = coffeeShopDTO.id;
        newCoffeeShopDTO.rowVersion = coffeeShopDTO.rowVersion;
        newCoffeeShopDTO.name = coffeeShopDTO.name;
        newCoffeeShopDTO.displayName = coffeeShopDTO.displayName;
        newCoffeeShopDTO.address = coffeeShopDTO.address;
        newCoffeeShopDTO.pictureURL = coffeeShopDTO.pictureURL;
        newCoffeeShopDTO.description = coffeeShopDTO.description;
        //Actualizamos

        let updatedCoffeeShopDTO = await context.coffeeShopsService.updateOne(coffeeShopDTO, coffeeShopDTO.id, errors);
        expect(updatedCoffeeShopDTO).not.toBe(null);
        expect(updatedCoffeeShopDTO.displayName).toBe(newCoffeeShopDTO.displayName);
        //Recuperamos los valores salvados
        updatedCoffeeShopDTO.id = newCoffeeShopDTO.id;
        updatedCoffeeShopDTO.rowVersion = newCoffeeShopDTO.rowVersion;
        updatedCoffeeShopDTO.name = newCoffeeShopDTO.name;
        updatedCoffeeShopDTO.displayName = newCoffeeShopDTO.displayName;
        updatedCoffeeShopDTO.address = newCoffeeShopDTO.address;
        updatedCoffeeShopDTO.pictureURL = newCoffeeShopDTO.pictureURL;
        updatedCoffeeShopDTO.description = newCoffeeShopDTO.description;
        //Volvemos a actualizar 
        updatedCoffeeShopDTO = await context.coffeeShopsService.updateOne(coffeeShopDTO, coffeeShopDTO.id, errors);
        //Ha de dar un nulo por rowVersion vieja
        expect(updatedCoffeeShopDTO).toBe(null);
    }
});

test('Cannot update a keyIndex to an existing record', async () => {
    let context = new CoffeeShopContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let coffeeShopDTO = context.coffeeShopsService.postModel();
        coffeeShopDTO.name = "CoffeeTest 1";
        coffeeShopDTO.displayName = "CoffeeTest 1";
        coffeeShopDTO.address = "Caleruega 102";
        coffeeShopDTO.pictureURL = "CoffeeTest.png";
        coffeeShopDTO.description = "Una cafeteria de tests";

        let newCoffeeShopDTO = await context.coffeeShopsService.createOne(coffeeShopDTO, errors);
        expect(newCoffeeShopDTO).not.toBe(null);
        expect(newCoffeeShopDTO.name).toBe("CoffeeTest 1");
        expect(newCoffeeShopDTO.displayName).toBe("CoffeeTest 1");
        expect(newCoffeeShopDTO.address).toBe("Caleruega 102");
        expect(newCoffeeShopDTO.pictureURL).toBe("CoffeeTest.png");
        expect(newCoffeeShopDTO.description).toBe("Una cafeteria de tests");

        newCoffeeShopDTO.name = "CoffeeTest 2";
        let updatedCoffeeShopDTO = await context.coffeeShopsService.updateOne(newCoffeeShopDTO, newCoffeeShopDTO.id, errors);
        expect(updatedCoffeeShopDTO).not.toBe(null);
        expect(updatedCoffeeShopDTO.name).toBe("CoffeeTest 2");
        newCoffeeShopDTO.name = "CoffeeTest 3";
        updatedCoffeeShopDTO = await context.coffeeShopsService.updateOne(newCoffeeShopDTO, newCoffeeShopDTO.id, errors);
        expect(updatedCoffeeShopDTO).not.toBe(null);
    }
});

test('ReadAll RecordsDTO', async () => {
    let context = new CoffeeShopContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var filter = {};
        var errors = [];
        let coffeeShopsDTO = await context.coffeeShopsService.readAll(filter, errors);
        expect(coffeeShopsDTO).not.toBe(null);
        expect(coffeeShopsDTO.length).toBe(2);
    }
});

test('Delete a record', async () => {
    let context = new CoffeeShopContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let coffeeShopsDTO = await context.coffeeShopsService.findCoffeeShopsByName("Cafeteria 2", errors);
        expect(coffeeShopsDTO).not.toBe(null);
        expect(coffeeShopsDTO.length).toBe(1);
        expect(coffeeShopsDTO[0].name).toBe("Cafeteria 2");
        let coffeeShopDTO = coffeeShopsDTO[0];
        let deletedResult = await context.coffeeShopsService.deleteOne(coffeeShopDTO.id, errors);
        expect(deletedResult).toBe(true);
    }
});

test('Deleting twice the same record', async () => {
    let context = new CoffeeShopContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let coffeeShopsDTO = await context.coffeeShopsService.findCoffeeShopsByName("CoffeeTest 3", errors);
        expect(coffeeShopsDTO).not.toBe(null);
        expect(coffeeShopsDTO.length).toBe(1);
        expect(coffeeShopsDTO[0].name).toBe("CoffeeTest 3");
        let coffeeShopDTO = coffeeShopsDTO[0];
        let deletedResult = await context.coffeeShopsService.deleteOne(coffeeShopDTO.id, errors);
        expect(deletedResult).toBe(true);
        let deleted2Result = await context.coffeeShopsService.deleteOne(coffeeShopDTO.id, errors);
        expect(deleted2Result).toBe(false);
    }
});