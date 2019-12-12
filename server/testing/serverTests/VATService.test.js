class VATContext {
    constructor() {
        this.mongoose = require('mongoose');
        this.Services = require('../../Services/Services');
        this.VATsService = require('../../Services/VATsService');

        this.services = new this.Services();
        this.services.DAO.VATDAO = require('../../DAO/VATDAO');
        this.services.DTO.VATDTO = require('../../DTO/VATDTO');
        this.services.DAO.FullVATDTO = require('../../DTO/FullVATDTO');

        this.services.services.vatsService = new this.VATsService(this.services);

        this.vatsService = this.services.services.vatsService;
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
            let vatsDAO = await this.services.DAO.VATDAO.find();
            if (vatsDAO) {
                for (let vatDAO of vatsDAO) {
                    await this.services.DAO.VATDAO.deleteOne({
                        _id: vatDAO._id
                    });
                }
            }
        }
    }

}


test('After clearing contextDB no record is found', async () => {
    let context = new VATContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        await context.clearContextData();
        var errors = [];
        let vatsDTO = await context.vatsService.readAll({}, errors);
        expect(vatsDTO.length).toBe(0);
    }
});

test('Can create a new record', async () => {
    let context = new VATContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        let vatDTO = context.vatsService.postModel();
        vatDTO.kind = "R";
        vatDTO.displayName = "Reduced";
        vatDTO.percentage = 0.15;
        var errors = [];
        let newVatDTO = await context.vatsService.createOne(vatDTO, errors);
        expect(newVatDTO).not.toBe(null);
        expect(newVatDTO.kind).toBe("R");
        expect(newVatDTO.displayName).toBe("Reduced");
        expect(newVatDTO.percentage).toBe(0.15);
    }
});

test('Cannot duplicate a record', async () => {
    let context = new VATContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let vatDTO = context.vatsService.model();
        vatDTO.kind = "R";
        vatDTO.displayName = "Reduced";
        vatDTO.percentage = 0.15;
        let newVatDTO = await context.vatsService.createOne(vatDTO, errors);
        expect(newVatDTO).toBe(null);
    }
});

test('can read a record', async () => {
    let context = new VATContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let vatsDTO = await context.vatsService.findVATsByKind("R", errors);
        expect(vatsDTO).not.toBe(null);
        expect(vatsDTO.length).toBe(1);
        expect(vatsDTO[0].kind).toBe("R");
        let vatDTO = await context.vatsService.readOne(vatsDTO[0].id, errors);
        expect(vatDTO).not.toBe(null);
        expect(vatDTO.id).toBe(vatsDTO[0].id);
    }
});


test('Can read a fullRecordDTO', async () => {
    let context = new VATContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let vatsDTO = await context.vatsService.findVATsByKind("R", errors);
        expect(vatsDTO).not.toBe(null);
        expect(vatsDTO.length).toBe(1);
        expect(vatsDTO[0].kind).toBe("R");
        let vatDTO = await context.vatsService.readFullOne(vatsDTO[0].id, errors);
        expect(vatDTO).not.toBe(null);
        expect(vatDTO.id).toBe(vatsDTO[0].id);
    }
});

test('Cannot read a RecordDTO, id.value = dummy', async () => {
    let context = new VATContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let id = context.mongoose.Types.ObjectId();
        let vatDTO = await context.vatsService.readOne(id, errors);
        expect(vatDTO).toBe(null);
    }
});

test('Cannot read a fullRecordDTO, id.value = dummy', async () => {
    let context = new VATContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let id = context.mongoose.Types.ObjectId();
        let vatDTO = await context.vatsService.readFullOne(id, errors);
        expect(vatDTO).toBe(null);
    }
});



test('can update a record', async () => {
    let context = new VATContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let vatsDTO = await context.vatsService.findVATsByKind("R", errors);
        expect(vatsDTO).not.toBe(null);
        expect(vatsDTO.length).toBe(1);
        expect(vatsDTO[0].kind).toBe("R");
        let vatDTO = vatsDTO[0];
        vatDTO.displayName = "RR";
        let updatedVatDTO = await context.vatsService.updateOne(vatDTO, vatDTO.id, errors);
        expect(updatedVatDTO).not.toBe(null);
        expect(updatedVatDTO.displayName).toBe("RR");
    }
});

test('cannot update a record with a dummyId', async () => {
    let context = new VATContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let vatsDTO = await context.vatsService.findVATsByKind("R", errors);
        expect(vatsDTO).not.toBe(null);
        expect(vatsDTO.length).toBe(1);
        expect(vatsDTO[0].kind).toBe("R");
        let vatDTO = vatsDTO[0];
        let dummyId = context.mongoose.Types.ObjectId();
        let updatedVatDTO = await context.vatsService.updateOne(vatDTO, dummyId, errors);
        expect(updatedVatDTO).toBe(null);
    }
});

test('Cannot update twice the same record', async () => {
    let context = new VATContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let vatsDTO = await context.vatsService.findVATsByKind("R", errors);
        expect(vatsDTO).not.toBe(null);
        expect(vatsDTO.length).toBe(1);
        expect(vatsDTO[0].kind).toBe("R");
        let vatDTO = vatsDTO[0];
        let newVatDTO = context.vatsService.putModel();
        //copiamos todos los valores que tenemos en vatDTO
        newVatDTO.id = vatDTO.id;
        newVatDTO.rowVersion = vatDTO.rowVersion;
        newVatDTO.kind = vatDTO.kind;
        newVatDTO.displayName = vatDTO.displayName;
        newVatDTO.percentage = vatDTO.percentage;
        //Actualizamos
        let updatedVatDTO = await context.vatsService.updateOne(vatDTO, vatDTO.id, errors);
        expect(updatedVatDTO).not.toBe(null);
        expect(updatedVatDTO.displayName).toBe(newVatDTO.displayName);
        //Recuperamos los valores salvados
        vatDTO.id = newVatDTO.id;
        vatDTO.rowVersion = newVatDTO.rowVersion;
        vatDTO.kind = newVatDTO.kind;
        vatDTO.displayName = newVatDTO.displayName;
        vatDTO.percentage = newVatDTO.percentage;
        //Volvemos a actualizar 
        updatedVatDTO = await context.vatsService.updateOne(vatDTO, vatDTO.id, errors);
        //Ha de dar un nulo por rowVersion vieja
        expect(updatedVatDTO).toBe(null);

    }
});

test('Cannot update a keyIndex to an existing record', async () => {
    let context = new VATContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let vatDTO = context.vatsService.postModel();
        vatDTO.kind = "N";
        vatDTO.displayName = "Normal";
        vatDTO.percentage = 0.21;
        let newVatDTO = await context.vatsService.createOne(vatDTO, errors);
        expect(newVatDTO).not.toBe(null);
        expect(newVatDTO.kind).toBe("N");
        expect(newVatDTO.displayName).toBe("Normal");
        expect(newVatDTO.percentage).toBe(0.21);
        newVatDTO.kind = "X";
        let updatedVatDTO = await context.vatsService.updateOne(newVatDTO, newVatDTO.id, errors);
        expect(updatedVatDTO).not.toBe(null);
        expect(updatedVatDTO.kind).toBe("X");
        newVatDTO.kind = "R";
        updatedVatDTO = await context.vatsService.updateOne(newVatDTO, newVatDTO.id, errors);
        expect(updatedVatDTO).toBe(null);

    }
});

test('ReadAll RecordsDTO', async () => {
    let context = new VATContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var filter = {};
        var errors = [];
        let vatsDTO = await context.vatsService.readAll(filter, errors);
        expect(vatsDTO).not.toBe(null);
        expect(vatsDTO.length).toBe(2);
    }
});

test('Delete a record', async () => {
    let context = new VATContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let vatsDTO = await context.vatsService.findVATsByKind("R", errors);
        expect(vatsDTO).not.toBe(null);
        expect(vatsDTO.length).toBe(1);
        expect(vatsDTO[0].kind).toBe("R");
        let vatDTO = vatsDTO[0];
        let deletedResult = await context.vatsService.deleteOne(vatDTO.id, errors);
        expect(deletedResult).toBe(true);
    }
});

test('Deleting twice the same record', async () => {
    let context = new VATContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let vatsDTO = await context.vatsService.findVATsByKind("X", errors);
        expect(vatsDTO).not.toBe(null);
        expect(vatsDTO.length).toBe(1);
        expect(vatsDTO[0].kind).toBe("X");
        let vatDTO = vatsDTO[0];
        let deletedResult = await context.vatsService.deleteOne(vatDTO.id, errors);
        expect(deletedResult).toBe(true);
        let deleted2Result = await context.vatsService.deleteOne(vatDTO.id, errors);
        expect(deleted2Result).toBe(false);
    }
});