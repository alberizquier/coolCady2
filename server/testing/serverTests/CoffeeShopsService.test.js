class CoffeeShopContext {
    constructor() {
        this.mongoose = require('mongoose');
        this.Services = require('../../Services/Services');
        this.CoffeeShopsService = require('../../Services/CoffeeShopsService');

        this.services = new this.Services();
        this.services.DAO.CoffeeShopDAO = require('../../DAO/CoffeeShopDAO');
        this.services.DTO.CoffeeShopDTO = require('../../DTO/CoffeeShopDTO');
        this.services.DAO.FullCoffeeShopDTO = require('../../DTO/FullCoffeeShopDTO');

        this.services.services.coffeeShopsService = new this.CoffeeShopsService(this.services);

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

// test('Can create a new record', async () => {
// let context = new CoffeeShopContext("localhost", "coolCaddyTest");
// let connection = await context.connect("localhost", "coolCaddyTest");
// if (connection) {
// let coffeeShopDTO = context.coffeeShopsService.postModel();
// coffeeShopDTO.name = "Cafeteria 1";
// coffeeShopDTO.displayName = "Cafeteria 1";
// coffeeShopDTO.address = "Via de la inmaculada 1";
// coffeeShopDTO.pictureURL = "Cafeteria1.png";
// coffeeShopDTO.description = "Una cafeteria de churros";
// var errors = [];
// let newCoffeeShopDTO = await context.coffeeShopsService.createOne(coffeeShopDTO, errors);
// expect(newCoffeeShopDTO).not.toBe(null);
// expect(newCoffeeShopDTO.name).toBe("Cafeteria 1");
// expect(newCoffeeShopDTO.displayName).toBe("Cafeteria 1");
// expect(newCoffeeShopDTO.address).toBe("Via de la inmaculada 1");
// expect(newCoffeeShopDTO.pictureURL).toBe("Cafeteria1.png");
// expect(newCoffeeShopDTO.description).toBe("Una cafeteria de churros");
// }
// });

// test('Cannot duplicate a record', async () => {
// let context = new CoffeeShopContext("localhost", "coolCaddyTest");
// let connection = await context.connect("localhost", "coolCaddyTest");
// if (connection) {
// let coffeeShopDTO = context.coffeeShopsService.model();
// coffeeShopDTO.name = "Cafeteria 1";
// coffeeShopDTO.displayName = "Cafeteria 1";
// coffeeShopDTO.address = "Via de la inmaculada 1";
// coffeeShopDTO.pictureURL = "Cafeteria1.png";
// coffeeShopDTO.description = "Una cafeteria de churros";
// var errors = [];
// let newCoffeeShopDTO = await context.coffeeShopsService.createOne(coffeeShopDTO, errors);
// expect(newCoffeeShopDTO).toBe(null);
// }
// });

// test('can read a record', async () => {
// let context = new CoffeeShopContext("localhost", "coolCaddyTest");
// let connection = await context.connect("localhost", "coolCaddyTest");
// if (connection) {
// var errors = [];
// let coffeeShopsDTO = await context.coffeeShopsService.findCoffeeShopsByName("Cafeteria 1", errors);
// expect(coffeeShopsDTO).not.toBe(null);
// expect(coffeeShopsDTO.length).toBe(1);
// expect(coffeeShopsDTO[0].name).toBe("Cafeteria 1");
// errors = [];
// let coffeeShopDTO = await context.coffeeShopsService.readOne(coffeeShopsDTO[0].id, errors);
// expect(coffeeShopDTO).not.toBe(null);
// expect(coffeeShopDTO.id).toBe(coffeeShopsDTO[0].id);
// }
// });

// test('Can read a fullRecordDTO', async () => {
// let context = new CoffeeShopContext("localhost", "coolCaddyTest");
// let connection = await context.connect("localhost", "coolCaddyTest");
// if (connection) {
// var errors = [];
// let coffeeShopsDTO = await context.coffeeShopsService.findCoffeeShopsByName("Cafeteria 1", errors);
// expect(coffeeShopsDTO).not.toBe(null);
// expect(coffeeShopsDTO.length).toBe(1);
// expect(coffeeShopsDTO[0].name).toBe("Cafeteria 1");
// errors = [];
// let coffeeShopDTO = await context.coffeeShopsService.readFullOne(coffeeShopsDTO[0].id, errors);
// expect(coffeeShopDTO).not.toBe(null);
// expect(coffeeShopDTO.id).toBe(coffeeShopsDTO[0].id);
// }
// });

// test('Cannot read a RecordDTO, id.value = dummy', async () => {
// let context = new CoffeeShopContext("localhost", "coolCaddyTest");
// let connection = await context.connect("localhost", "coolCaddyTest");
// if (connection) {
// var errors = [];
// let id = context.mongoose.Types.ObjectId();
// let coffeeShopDTO = await context.coffeeShopsService.readOne(id, errors);
// expect(coffeeShopDTO).toBe(null);
// }
// });

// test('Cannot read a fullRecordDTO, id.value = dummy', async () => {
// let context = new CoffeeShopContext("localhost", "coolCaddyTest");
// let connection = await context.connect("localhost", "coolCaddyTest");
// if (connection) {
// var errors = [];
// let id = context.mongoose.Types.ObjectId();
// let coffeeShopDTO = await context.coffeeShopsService.readFullOne(id, errors);
// expect(coffeeShopDTO).toBe(null);
// }
// });

// test('can update a record', async () => {
// let context = new CoffeeShopContext("localhost", "coolCaddyTest");
// let connection = await context.connect("localhost", "coolCaddyTest");
// if (connection) {
// var errors = [];
// let coffeeShopsDTO = await context.coffeeShopsService.findCoffeeShopsByName("Cafeteria 1", errors);
// expect(coffeeShopsDTO).not.toBe(null);
// expect(coffeeShopsDTO.length).toBe(1);
// expect(coffeeShopsDTO[0].name).toBe("Cafeteria 1");
// errors = [];
// let coffeeShopDTO = coffeeShopsDTO[0];
// coffeeShopDTO.name = "Cafeteria 2";
// errors = [];
// let updatedVatDTO = await context.coffeeShopsService.updateOne(coffeeShopDTO, coffeeShopDTO.id, errors);
// expect(updatedVatDTO).not.toBe(null);
// expect(updatedVatDTO.displayName).toBe("Cafeteria 1");
// }
// });

// test('cannot update a record with a dummyId', async () => {
// let context = new CoffeeShopContext("localhost", "coolCaddyTest");
// let connection = await context.connect("localhost", "coolCaddyTest");
// if (connection) {
// var errors = [];
// let coffeeShopsDTO = await context.coffeeShopsService.findCoffeeShopsByName("Cafeteria 1", errors);
// expect(coffeeShopsDTO).not.toBe(null);
// expect(coffeeShopsDTO.length).toBe(1);
// expect(coffeeShopsDTO[0].name).toBe("Cafeteria 1");
// errors = [];
// let coffeeShopDTO = coffeeShopsDTO[0];
// let dummyId = context.mongoose.Types.ObjectId();
// errors = [];
// let updatedVatDTO = await context.coffeeShopsService.updateOne(coffeeShopDTO, dummyId, errors);
// expect(updatedVatDTO).toBe(null);
// }
// });

// test('Cannot update twice the same record', async () => {
// let context = new CoffeeShopContext("localhost", "coolCaddyTest");
// let connection = await context.connect("localhost", "coolCaddyTest");
// if (connection) {
// var errors = [];
// let coffeeShopsDTO = await context.coffeeShopsService.findCoffeeShopsByName("Cafeteria 1", errors);
// expect(coffeeShopsDTO).not.toBe(null);
// expect(coffeeShopsDTO.length).toBe(1);
// expect(coffeeShopsDTO[0].kind).toBe("R");
// errors = [];
// let coffeeShopDTO = coffeeShopsDTO[0];
// let newVatDTO = context.coffeeShopsService.putModel();
// //copiamos todos los valores que tenemos en coffeeShopDTO
// newVatDTO.id = coffeeShopDTO.id;
// newVatDTO.rowVersion = coffeeShopDTO.rowVersion;
// newVatDTO.kind = coffeeShopDTO.kind;
// newVatDTO.displayName = coffeeShopDTO.displayName;
// newVatDTO.percentage = coffeeShopDTO.percentage;
// //Actualizamos
// errors = [];
// let updatedVatDTO = await context.coffeeShopsService.updateOne(coffeeShopDTO, coffeeShopDTO.id, errors);
// expect(updatedVatDTO).not.toBe(null);
// expect(updatedVatDTO.displayName).toBe(newVatDTO.displayName);
// //Recuperamos los valores salvados
// coffeeShopDTO.id = newVatDTO.id;
// coffeeShopDTO.rowVersion = newVatDTO.rowVersion;
// coffeeShopDTO.kind = newVatDTO.kind;
// coffeeShopDTO.displayName = newVatDTO.displayName;
// coffeeShopDTO.percentage = newVatDTO.percentage;
// //Volvemos a actualizar 
// updatedVatDTO = await context.coffeeShopsService.updateOne(coffeeShopDTO, coffeeShopDTO.id, errors);
// //Ha de dar un nulo por rowVersion vieja
// expect(updatedVatDTO).toBe(null);

// }
// });

// test('Cannot update a keyIndex to an existing record', async () => {
// let context = new CoffeeShopContext("localhost", "coolCaddyTest");
// let connection = await context.connect("localhost", "coolCaddyTest");
// if (connection) {
// let coffeeShopDTO = context.coffeeShopsService.postModel();
// coffeeShopDTO.kind = "N";
// coffeeShopDTO.displayName = "Normal";
// coffeeShopDTO.percentage = 0.21;
// var errors = [];
// let newVatDTO = await context.coffeeShopsService.createOne(coffeeShopDTO, errors);
// expect(newVatDTO).not.toBe(null);
// expect(newVatDTO.kind).toBe("N");
// expect(newVatDTO.displayName).toBe("Normal");
// expect(newVatDTO.percentage).toBe(0.21);
// newVatDTO.kind = "X";
// errors = [];
// let updatedVatDTO = await context.coffeeShopsService.updateOne(newVatDTO, newVatDTO.id, errors);
// expect(updatedVatDTO).not.toBe(null);
// expect(updatedVatDTO.kind).toBe("X");
// newVatDTO.kind = "R";
// errors = [];
// updatedVatDTO = await context.coffeeShopsService.updateOne(newVatDTO, newVatDTO.id, errors);
// expect(updatedVatDTO).toBe(null);

// }
// });

// test('ReadAll RecordsDTO', async () => {
// let context = new CoffeeShopContext("localhost", "coolCaddyTest");
// let connection = await context.connect("localhost", "coolCaddyTest");
// if (connection) {
// var filter = {};
// var errors = [];
// let coffeeShopsDTO = await context.coffeeShopsService.readAll(filter, errors);
// expect(coffeeShopsDTO).not.toBe(null);
// expect(coffeeShopsDTO.length).toBe(2);
// }
// });

// test('Delete a record', async () => {
// let context = new CoffeeShopContext("localhost", "coolCaddyTest");
// let connection = await context.connect("localhost", "coolCaddyTest");
// if (connection) {
// var errors = [];
// let coffeeShopsDTO = await context.coffeeShopsService.findCoffeeShopsByName("Cafeteria 1", errors);
// expect(coffeeShopsDTO).not.toBe(null);
// expect(coffeeShopsDTO.length).toBe(1);
// expect(coffeeShopsDTO[0].kind).toBe("R");
// errors = [];
// let coffeeShopDTO = coffeeShopsDTO[0];
// errors = [];
// let deletedResult = await context.coffeeShopsService.deleteOne(coffeeShopDTO.id, errors);
// expect(deletedResult).toBe(true);
// }
// });

// test('Deleting twice a record', async () => {
// let context = new CoffeeShopContext("localhost", "coolCaddyTest");
// let connection = await context.connect("localhost", "coolCaddyTest");
// if (connection) {
// var errors = [];
// let coffeeShopsDTO = await context.coffeeShopsService.findCoffeeShopsByName("Cafeteria 1", errors);
// expect(coffeeShopsDTO).not.toBe(null);
// expect(coffeeShopsDTO.length).toBe(1);
// expect(coffeeShopsDTO[0].name).toBe("X");
// errors = [];
// let coffeeShopDTO = coffeeShopsDTO[0];
// errors = [];
// let deletedResult = await context.coffeeShopsService.deleteOne(coffeeShopDTO.id, errors);
// expect(deletedResult).toBe(true);
// let deleted2Result = await context.coffeeShopsService.deleteOne(coffeeShopDTO.id, errors);
// expect(deleted2Result).toBe(false);
// }
// });