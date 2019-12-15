class DocHeaderContext {
    constructor() {
        this.mongoose = require('mongoose');
        this.Services = require('../../Services/Services');
        this.DocHeadersService = require('../../Services/DocHeadersService');

        this.services = new this.Services();
        this.services.DAO.DocHeaderDAO = require('../../DAO/DocHeaderDAO');
        this.services.DTO.DocHeaderDTO = require('../../DTO/DocHeaderDTO');
        this.services.DAO.FullDocHeaderDTO = require('../../DTO/FullDocHeaderDTO');

        this.services.services.docHeadersService = new this.DocHeadersService(this.services);

        this.docHeadersService = this.services.services.docHeadersService;
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
            let docHeadersDAO = await this.services.DAO.DocHeaderDAO.find();
            if (docHeadersDAO) {
                for (let docHeaderDAO of docHeadersDAO) {
                    await this.services.DAO.DocHeaderDAO.deleteOne({
                        _id: docHeaderDAO._id
                    });
                }
            }
        }
    }

}


test('After clearing contextDB no record is found', async () => {
    let context = new DocHeaderContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        await context.clearContextData();
        var errors = [];
        let docHeadersDTO = await context.docHeadersService.readAll({}, errors);
        expect(docHeadersDTO.length).toBe(0);
    }
});

test('Can create a new record', async () => {
    let context = new DocHeaderContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        let docHeaderDTO = context.docHeadersService.postModel();
        docHeaderDTO.kind = "R";
        docHeaderDTO.displayName = "Reduced";
        docHeaderDTO.percentage = 0.15;
        var errors = [];
        let newDocHeaderDTO = await context.docHeadersService.createOne(docHeaderDTO, errors);
        expect(newDocHeaderDTO).not.toBe(null);
        expect(newDocHeaderDTO.kind).toBe("R");
        expect(newDocHeaderDTO.displayName).toBe("Reduced");
        expect(newDocHeaderDTO.percentage).toBe(0.15);
    }
});

test('Cannot duplicate a record', async () => {
    let context = new DocHeaderContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let docHeaderDTO = context.docHeadersService.model();
        docHeaderDTO.kind = "R";
        docHeaderDTO.displayName = "Reduced";
        docHeaderDTO.percentage = 0.15;
        let newDocHeaderDTO = await context.docHeadersService.createOne(docHeaderDTO, errors);
        expect(newDocHeaderDTO).toBe(null);
    }
});

test('can read a record', async () => {
    let context = new DocHeaderContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let docHeadersDTO = await context.docHeadersService.findDocHeadersByKind("R", errors);
        expect(docHeadersDTO).not.toBe(null);
        expect(docHeadersDTO.length).toBe(1);
        expect(docHeadersDTO[0].kind).toBe("R");
        let docHeaderDTO = await context.docHeadersService.readOne(docHeadersDTO[0].id, errors);
        expect(docHeaderDTO).not.toBe(null);
        expect(docHeaderDTO.id).toBe(docHeadersDTO[0].id);
    }
});


test('Can read a fullRecordDTO', async () => {
    let context = new DocHeaderContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let docHeadersDTO = await context.docHeadersService.findDocHeadersByKind("R", errors);
        expect(docHeadersDTO).not.toBe(null);
        expect(docHeadersDTO.length).toBe(1);
        expect(docHeadersDTO[0].kind).toBe("R");
        let docHeaderDTO = await context.docHeadersService.readFullOne(docHeadersDTO[0].id, errors);
        expect(docHeaderDTO).not.toBe(null);
        expect(docHeaderDTO.id).toBe(docHeadersDTO[0].id);
    }
});

test('Cannot read a RecordDTO, id.value = dummy', async () => {
    let context = new DocHeaderContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let id = context.mongoose.Types.ObjectId();
        let docHeaderDTO = await context.docHeadersService.readOne(id, errors);
        expect(docHeaderDTO).toBe(null);
    }
});

test('Cannot read a fullRecordDTO, id.value = dummy', async () => {
    let context = new DocHeaderContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let id = context.mongoose.Types.ObjectId();
        let docHeaderDTO = await context.docHeadersService.readFullOne(id, errors);
        expect(docHeaderDTO).toBe(null);
    }
});



test('can update a record', async () => {
    let context = new DocHeaderContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let docHeadersDTO = await context.docHeadersService.findDocHeadersByKind("R", errors);
        expect(docHeadersDTO).not.toBe(null);
        expect(docHeadersDTO.length).toBe(1);
        expect(docHeadersDTO[0].kind).toBe("R");
        let docHeaderDTO = docHeadersDTO[0];
        docHeaderDTO.displayName = "RR";
        let updatedDocHeaderDTO = await context.docHeadersService.updateOne(docHeaderDTO, docHeaderDTO.id, errors);
        expect(updatedDocHeaderDTO).not.toBe(null);
        expect(updatedDocHeaderDTO.displayName).toBe("RR");
    }
});

test('cannot update a record with a dummyId', async () => {
    let context = new DocHeaderContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let docHeadersDTO = await context.docHeadersService.findDocHeadersByKind("R", errors);
        expect(docHeadersDTO).not.toBe(null);
        expect(docHeadersDTO.length).toBe(1);
        expect(docHeadersDTO[0].kind).toBe("R");
        let docHeaderDTO = docHeadersDTO[0];
        let dummyId = context.mongoose.Types.ObjectId();
        let updatedDocHeaderDTO = await context.docHeadersService.updateOne(docHeaderDTO, dummyId, errors);
        expect(updatedDocHeaderDTO).toBe(null);
    }
});

test('Cannot update twice the same record', async () => {
    let context = new DocHeaderContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let docHeadersDTO = await context.docHeadersService.findDocHeadersByKind("R", errors);
        expect(docHeadersDTO).not.toBe(null);
        expect(docHeadersDTO.length).toBe(1);
        expect(docHeadersDTO[0].kind).toBe("R");
        let docHeaderDTO = docHeadersDTO[0];
        let newDocHeaderDTO = context.docHeadersService.putModel();
        //copiamos todos los valores que tenemos en docHeaderDTO
        newDocHeaderDTO.id = docHeaderDTO.id;
        newDocHeaderDTO.rowVersion = docHeaderDTO.rowVersion;
        newDocHeaderDTO.kind = docHeaderDTO.kind;
        newDocHeaderDTO.displayName = docHeaderDTO.displayName;
        newDocHeaderDTO.percentage = docHeaderDTO.percentage;
        //Actualizamos
        let updatedDocHeaderDTO = await context.docHeadersService.updateOne(docHeaderDTO, docHeaderDTO.id, errors);
        expect(updatedDocHeaderDTO).not.toBe(null);
        expect(updatedDocHeaderDTO.displayName).toBe(newDocHeaderDTO.displayName);
        //Recuperamos los valores salvados
        docHeaderDTO.id = newDocHeaderDTO.id;
        docHeaderDTO.rowVersion = newDocHeaderDTO.rowVersion;
        docHeaderDTO.kind = newDocHeaderDTO.kind;
        docHeaderDTO.displayName = newDocHeaderDTO.displayName;
        docHeaderDTO.percentage = newDocHeaderDTO.percentage;
        //Volvemos a actualizar 
        updatedDocHeaderDTO = await context.docHeadersService.updateOne(docHeaderDTO, docHeaderDTO.id, errors);
        //Ha de dar un nulo por rowVersion vieja
        expect(updatedDocHeaderDTO).toBe(null);

    }
});

test('Cannot update a keyIndex to an existing record', async () => {
    let context = new DocHeaderContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let docHeaderDTO = context.docHeadersService.postModel();
        docHeaderDTO.kind = "N";
        docHeaderDTO.displayName = "Normal";
        docHeaderDTO.percentage = 0.21;
        let newDocHeaderDTO = await context.docHeadersService.createOne(docHeaderDTO, errors);
        expect(newDocHeaderDTO).not.toBe(null);
        expect(newDocHeaderDTO.kind).toBe("N");
        expect(newDocHeaderDTO.displayName).toBe("Normal");
        expect(newDocHeaderDTO.percentage).toBe(0.21);
        newDocHeaderDTO.kind = "X";
        let updatedDocHeaderDTO = await context.docHeadersService.updateOne(newDocHeaderDTO, newDocHeaderDTO.id, errors);
        expect(updatedDocHeaderDTO).not.toBe(null);
        expect(updatedDocHeaderDTO.kind).toBe("X");
        newDocHeaderDTO.kind = "R";
        updatedDocHeaderDTO = await context.docHeadersService.updateOne(newDocHeaderDTO, newDocHeaderDTO.id, errors);
        expect(updatedDocHeaderDTO).toBe(null);

    }
});

test('ReadAll RecordsDTO', async () => {
    let context = new DocHeaderContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var filter = {};
        var errors = [];
        let docHeadersDTO = await context.docHeadersService.readAll(filter, errors);
        expect(docHeadersDTO).not.toBe(null);
        expect(docHeadersDTO.length).toBe(2);
    }
});

test('Delete a record', async () => {
    let context = new DocHeaderContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let docHeadersDTO = await context.docHeadersService.findDocHeadersByKind("R", errors);
        expect(docHeadersDTO).not.toBe(null);
        expect(docHeadersDTO.length).toBe(1);
        expect(docHeadersDTO[0].kind).toBe("R");
        let docHeaderDTO = docHeadersDTO[0];
        let deletedResult = await context.docHeadersService.deleteOne(docHeaderDTO.id, errors);
        expect(deletedResult).toBe(true);
    }
});

test('Deleting twice the same record', async () => {
    let context = new DocHeaderContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let docHeadersDTO = await context.docHeadersService.findDocHeadersByKind("X", errors);
        expect(docHeadersDTO).not.toBe(null);
        expect(docHeadersDTO.length).toBe(1);
        expect(docHeadersDTO[0].kind).toBe("X");
        let docHeaderDTO = docHeadersDTO[0];
        let deletedResult = await context.docHeadersService.deleteOne(docHeaderDTO.id, errors);
        expect(deletedResult).toBe(true);
        let deleted2Result = await context.docHeadersService.deleteOne(docHeaderDTO.id, errors);
        expect(deleted2Result).toBe(false);
    }
});