class KindProductContext {
    constructor() {
        this.mongoose = require('mongoose');
        this.Services = require('../../Services/Services');
        this.KindProductsService = require('../../Services/KindProductsService');

        this.services = new this.Services();
        this.services.DAO.KindProductDAO = require('../../DAO/KindProductDAO');
        this.services.DTO.KindProductDTO = require('../../DTO/KindProductDTO');
        this.services.DAO.FullKindProductDTO = require('../../DTO/FullKindProductDTO');

        this.services.services.kindProductsService = new this.KindProductsService(this.services);

        this.kindProductsService = this.services.services.kindProductsService;
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
            let kindProductsDAO = await this.services.DAO.KindProductDAO.find();
            if (kindProductsDAO) {
                for (let kindProductDAO of kindProductsDAO) {
                    await this.services.DAO.KindProductDAO.deleteOne({
                        _id: kindProductDAO._id
                    });
                }
            }
        }
    }

}


test('After clearing contextDB no record is found', async () => {
    let context = new KindProductContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        await context.clearContextData();
        var errors = [];
        let kindProductsDTO = await context.kindProductsService.readAll({}, errors);
        expect(kindProductsDTO.length).toBe(0);
    }
});

test('Can create a new record', async () => {
    let context = new KindProductContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let kindProductDTO = context.kindProductsService.postModel();
        kindProductDTO.kind = "Coffee";
        kindProductDTO.subKind = "VILLA ROSITA – LIME";
        kindProductDTO.description = "lemon, ginger, lime cake";
        let newKindProductDTO = await context.kindProductsService.createOne(kindProductDTO, errors);
        expect(newKindProductDTO).not.toBe(null);
        expect(newKindProductDTO.kind).toBe("Coffee");
        expect(newKindProductDTO.subKind).toBe("VILLA ROSITA – LIME");
        expect(newKindProductDTO.description).toBe("lemon, ginger, lime cake");
    }
});

test('Cannot duplicate a record', async () => {
    let context = new KindProductContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let kindProductDTO = context.kindProductsService.model();
        kindProductDTO.kind = "Coffee";
        kindProductDTO.subKind = "VILLA ROSITA – LIME";
        kindProductDTO.description = "lemon, ginger, lime cake";
        let newKindProductDTO = await context.kindProductsService.createOne(kindProductDTO, errors);
        expect(newKindProductDTO).toBe(null);
    }
});

test('can read a record', async () => {
    let context = new KindProductContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let kindProductsDTO = await context.kindProductsService.findKindProductsByKindSubKind("Coffee","VILLA ROSITA – LIME", errors);
        expect(kindProductsDTO).not.toBe(null);
        expect(kindProductsDTO.length).toBe(1);
        expect(kindProductsDTO[0].kind).toBe("Coffee");
        let kindProductDTO = await context.kindProductsService.readOne(kindProductsDTO[0].id, errors);
        expect(kindProductDTO).not.toBe(null);
        expect(kindProductDTO.id).toBe(kindProductsDTO[0].id);
    }
});

test('Can read a fullRecordDTO', async () => {
    let context = new KindProductContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let kindProductsDTO = await context.kindProductsService.findKindProductsByKindSubKind("Coffee","VILLA ROSITA – LIME", errors);
        expect(kindProductsDTO).not.toBe(null);
        expect(kindProductsDTO.length).toBe(1);
        expect(kindProductsDTO[0].kind).toBe("Coffee");
        let kindProductDTO = await context.kindProductsService.readFullOne(kindProductsDTO[0].id, errors);
        expect(kindProductDTO).not.toBe(null);
        expect(kindProductDTO.id).toBe(kindProductsDTO[0].id);
    }
});

test('Cannot read a RecordDTO, id.value = dummy', async () => {
    let context = new KindProductContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let id = context.mongoose.Types.ObjectId();
        let kindProductDTO = await context.kindProductsService.readOne(id, errors);
        expect(kindProductDTO).toBe(null);
    }
});

test('Cannot read a fullRecordDTO, id.value = dummy', async () => {
    let context = new KindProductContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let id = context.mongoose.Types.ObjectId();
        let kindProductDTO = await context.kindProductsService.readFullOne(id, errors);
        expect(kindProductDTO).toBe(null);
    }
});

test('can update a record', async () => {
    let context = new KindProductContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let kindProductsDTO = await context.kindProductsService.findKindProductsByKindSubKind("Coffee","VILLA ROSITA – LIME", errors);
        expect(kindProductsDTO).not.toBe(null);
        expect(kindProductsDTO.length).toBe(1);
        expect(kindProductsDTO[0].kind).toBe("Coffee");
        let kindProductDTO = kindProductsDTO[0];
        kindProductDTO.kind = "Food";
        let updatedKindProductDTO = await context.kindProductsService.updateOne(kindProductDTO, kindProductDTO.id, errors);
        expect(updatedKindProductDTO).not.toBe(null);
        expect(updatedKindProductDTO.kind).toBe("Food");
    }
});

test('cannot update a record with a dummyId', async () => {
    let context = new KindProductContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let kindProductsDTO = await context.kindProductsService.findKindProductsByKindSubKind("Food","VILLA ROSITA – LIME", errors);
        expect(kindProductsDTO).not.toBe(null);
        expect(kindProductsDTO.length).toBe(1);
        expect(kindProductsDTO[0].kind).toBe("Food");
        let kindProductDTO = kindProductsDTO[0];
        let dummyId = context.mongoose.Types.ObjectId();
        let updatedKindProductDTO = await context.kindProductsService.updateOne(kindProductDTO, dummyId, errors);
        expect(updatedKindProductDTO).toBe(null);
    }
});

test('Cannot update twice the same record', async () => {
    let context = new KindProductContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let kindProductsDTO = await context.kindProductsService.findKindProductsByKindSubKind("Food","VILLA ROSITA – LIME", errors);
        expect(kindProductsDTO).not.toBe(null);
        expect(kindProductsDTO.length).toBe(1);
        expect(kindProductsDTO[0].kind).toBe("Food");
        let kindProductDTO = kindProductsDTO[0];
        let newKindProductDTO = context.kindProductsService.putModel();
        //copiamos todos los valores que tenemos en kindProductDTO
        newKindProductDTO.id = kindProductDTO.id;
        newKindProductDTO.rowVersion = kindProductDTO.rowVersion;
        newKindProductDTO.kind = kindProductDTO.kind;
        newKindProductDTO.subKind = kindProductDTO.subKind;
        newKindProductDTO.description = kindProductDTO.description;
        //Actualizamos
        let updatedKindProductDTO = await context.kindProductsService.updateOne(kindProductDTO, kindProductDTO.id, errors);
        expect(updatedKindProductDTO).not.toBe(null);
        expect(updatedKindProductDTO.kind).toBe(newKindProductDTO.kind);
        //Recuperamos los valores salvados
        kindProductDTO.id = newKindProductDTO.id;
        kindProductDTO.rowVersion = newKindProductDTO.rowVersion;
        kindProductDTO.kind = newKindProductDTO.kind;
        kindProductDTO.subKind = newKindProductDTO.subKind;
        kindProductDTO.description = newKindProductDTO.description;
        //Volvemos a actualizar 
        updatedKindProductDTO = await context.kindProductsService.updateOne(kindProductDTO, kindProductDTO.id, errors);
        //Ha de dar un nulo por rowVersion vieja
        expect(updatedKindProductDTO).toBe(null);

    }
});

test('Cannot update a keyIndex to an existing record', async () => {
    let context = new KindProductContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let kindProductDTO = context.kindProductsService.postModel();
        kindProductDTO.kind = "Coffee";
        kindProductDTO.subKind = "FINCA EL SALVADOR - EL SALVADOR";
        kindProductDTO.description = "70% chocolate, hazelnuts, blueberries";
        let newKindProductDTO = await context.kindProductsService.createOne(kindProductDTO, errors);
        expect(newKindProductDTO).not.toBe(null);
        expect(newKindProductDTO.kind).toBe("Coffee");
        expect(newKindProductDTO.subKind).toBe("FINCA EL SALVADOR - EL SALVADOR");
        expect(newKindProductDTO.description).toBe("70% chocolate, hazelnuts, blueberries");
        newKindProductDTO.kind = "Food";
        let updatedKindProductDTO = await context.kindProductsService.updateOne(newKindProductDTO, newKindProductDTO.id, errors);
        expect(updatedKindProductDTO).not.toBe(null);
        expect(updatedKindProductDTO.kind).toBe("Food");
        newKindProductDTO.kind = "Coffee";
        updatedKindProductDTO = await context.kindProductsService.updateOne(newKindProductDTO, newKindProductDTO.id, errors);
        expect(updatedKindProductDTO).not.toBe(null);

    }
});

test('ReadAll RecordsDTO', async () => {
    let context = new KindProductContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var filter = {};
        var errors = [];
        let kindProductsDTO = await context.kindProductsService.readAll(filter, errors);
        expect(kindProductsDTO).not.toBe(null);
        expect(kindProductsDTO.length).toBe(2);
    }
});

test('Delete a record', async () => {
    let context = new KindProductContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let kindProductsDTO = await context.kindProductsService.findKindProductsByKindSubKind("Food","VILLA ROSITA – LIME", errors);
        expect(kindProductsDTO).not.toBe(null);
        expect(kindProductsDTO.length).toBe(1);
        expect(kindProductsDTO[0].kind).toBe("Food");
        let kindProductDTO = kindProductsDTO[0];
        let deletedResult = await context.kindProductsService.deleteOne(kindProductDTO.id, errors);
        expect(deletedResult).toBe(true);
    }
});

test('Deleting twice the same record', async () => {
    let context = new KindProductContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let kindProductsDTO = await context.kindProductsService.findKindProductsByKindSubKind("Coffee","FINCA EL SALVADOR - EL SALVADOR", errors);
        expect(kindProductsDTO).not.toBe(null);
        expect(kindProductsDTO.length).toBe(1);
        expect(kindProductsDTO[0].kind).toBe("Coffee");
        let kindProductDTO = kindProductsDTO[0];
        let deletedResult = await context.kindProductsService.deleteOne(kindProductDTO.id, errors);
        expect(deletedResult).toBe(true);
        let deleted2Result = await context.kindProductsService.deleteOne(kindProductDTO.id, errors);
        expect(deleted2Result).toBe(false);
    }
});