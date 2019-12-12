class UserContext {
    constructor() {
        this.mongoose = require('mongoose');
        this.Services = require('../../Services/Services');
        this.UsersService = require('../../Services/UsersService');

        this.services = new this.Services();
        this.services.DAO.UserDAO = require('../../DAO/UserDAO');
        this.services.DTO.UserDTO = require('../../DTO/UserDTO');
        this.services.DAO.FullUserDTO = require('../../DTO/FullUserDTO');

        this.services.services.usersService = new this.UsersService(this.services);

        this.usersService = this.services.services.usersService;
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
            let usersDAO = await this.services.DAO.UserDAO.find();
            if (usersDAO) {
                for (let userDAO of usersDAO) {
                    await this.services.DAO.UserDAO.deleteOne({
                        _id: userDAO._id
                    });
                }
            }
        }
    }

}

test('After clearing contextDB no record is found', async () => {
    let context = new UserContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        await context.clearContextData();
        var errors = [];
        let usersDTO = await context.usersService.readAll({}, errors);
        expect(usersDTO.length).toBe(0);
    }
});

test('Can create a new record', async () => {
    let context = new UserContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        let userDTO = context.usersService.postModel();
        userDTO.email = "admin@coolcaddy.com";
        userDTO.password = "123";
        userDTO.isAdmin = true;
        userDTO.isLocked = false;
        userDTO.pictureURL = "admin.png";
        userDTO.lastLogin = new Date();
        
        var errors = [];
        let newUserDTO = await context.usersService.createOne(userDTO, errors);
        expect(newUserDTO).not.toBe(null);
        expect(newUserDTO.email).toBe("admin@coolcaddy.com");
        expect(newUserDTO.password).toBe("123");
        expect(newUserDTO.isAdmin).toBe(true);
        expect(newUserDTO.isLocked).toBe(false);
        expect(newUserDTO.pictureURL).toBe("admin.png");
    }
});

test('Cannot duplicate a record', async () => {
    let context = new UserContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let userDTO = context.usersService.model();
        userDTO.email = "admin@coolcaddy.com";
        userDTO.password = "123";
        userDTO.isAdmin = true;
        userDTO.isLocked = false;
        userDTO.pictureURL = "admin.png";
        userDTO.lastLogin = new Date();
        let newUserDTO = await context.usersService.createOne(userDTO, errors);
        expect(newUserDTO).toBe(null);
    }
});

test('can read a record', async () => {
    let context = new UserContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let usersDTO = await context.usersService.findUsersByEmail("admin@coolcaddy.com", errors);
        expect(usersDTO).not.toBe(null);
        expect(usersDTO.length).toBe(1);
        expect(usersDTO[0].password).toBe("123");
        let userDTO = await context.usersService.readOne(usersDTO[0].id, errors);
        expect(userDTO).not.toBe(null);
        expect(userDTO.id).toBe(usersDTO[0].id);
    }
});

test('Can read a fullRecordDTO', async () => {
    let context = new UserContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let usersDTO = await context.usersService.findUsersByEmail("admin@coolcaddy.com", errors);
        expect(usersDTO).not.toBe(null);
        expect(usersDTO.length).toBe(1);
        expect(usersDTO[0].password).toBe("123");
        let userDTO = await context.usersService.readFullOne(usersDTO[0].id, errors);
        expect(userDTO).not.toBe(null);
        expect(userDTO.id).toBe(usersDTO[0].id);
    }
});

test('Cannot read a RecordDTO, id.value = dummy', async () => {
    let context = new UserContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let id = context.mongoose.Types.ObjectId();
        let userDTO = await context.usersService.readOne(id, errors);
        expect(userDTO).toBe(null);
    }
});

test('Cannot read a fullRecordDTO, id.value = dummy', async () => {
    let context = new UserContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let id = context.mongoose.Types.ObjectId();
        let userDTO = await context.usersService.readFullOne(id, errors);
        expect(userDTO).toBe(null);
    }
});


test('can update a record', async () => {
    let context = new UserContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let usersDTO = await context.usersService.findUsersByEmail("admin@coolcaddy.com", errors);
        expect(usersDTO).not.toBe(null);
        expect(usersDTO.length).toBe(1);
        expect(usersDTO[0].password).toBe("123");
        let userDTO = usersDTO[0];
        userDTO.email = "user@coolcaddy.com";
        let updatedUserDTO = await context.usersService.updateOne(userDTO, userDTO.id, errors);
        expect(updatedUserDTO).not.toBe(null);
        expect(updatedUserDTO.email).toBe("user@coolcaddy.com");
    }
});

test('cannot update a record with a dummyId', async () => {
    let context = new UserContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let usersDTO = await context.usersService.findUsersByEmail("user@coolcaddy.com", errors);
        expect(usersDTO).not.toBe(null);
        expect(usersDTO.length).toBe(1);
        expect(usersDTO[0].email).toBe("user@coolcaddy.com");
        let userDTO = usersDTO[0];
        let dummyId = context.mongoose.Types.ObjectId();
        let updatedUserDTO = await context.usersService.updateOne(userDTO, dummyId, errors);
        expect(updatedUserDTO).toBe(null);
    }
});

test('Cannot update twice the same record', async () => {
    let context = new UserContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let usersDTO = await context.usersService.findUsersByEmail("user@coolcaddy.com", errors);
        expect(usersDTO).not.toBe(null);
        expect(usersDTO.length).toBe(1);
        expect(usersDTO[0].password).toBe("123");
        let userDTO = usersDTO[0];
        let newUserDTO = context.usersService.putModel();
        //copiamos todos los valores que tenemos en userDTO
        newUserDTO.id = userDTO.id;
        newUserDTO.rowVersion = userDTO.rowVersion;
        newUserDTO.email = userDTO.email;
        newUserDTO.password = userDTO.password;
        newUserDTO.isAdmin = userDTO.isAdmin;
        newUserDTO.isLocked = userDTO.isLocked;
        newUserDTO.pictureURL = userDTO.pictureURL;
        newUserDTO.lastLogin = userDTO.lastLogin;
        
        //Actualizamos
        let updatedUserDTO = await context.usersService.updateOne(userDTO, userDTO.id, errors);
        expect(updatedUserDTO).not.toBe(null);
        expect(updatedUserDTO.email).toBe(newUserDTO.email);
        //Recuperamos los valores salvados
        userDTO.id = newUserDTO.id;
        userDTO.rowVersion = newUserDTO.rowVersion;
        userDTO.email = newUserDTO.email;
        userDTO.password = newUserDTO.password;
        userDTO.isAdmin = newUserDTO.isAdmin;
        userDTO.isLocked = newUserDTO.isLocked;
        userDTO.pictureURL = newUserDTO.pictureURL;
        userDTO.lastLogin = newUserDTO.lastLogin;
       
        //Volvemos a actualizar 
        updatedUserDTO = await context.usersService.updateOne(userDTO, userDTO.id, errors);
        //Ha de dar un nulo por rowVersion vieja
        expect(updatedUserDTO).toBe(null);
    }
});

test('Cannot update a keyIndex to an existing record', async () => {
    let context = new UserContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let userDTO = context.usersService.postModel();
        userDTO.email = "admin@coolcaddy.com";
        userDTO.password = "123";
        userDTO.isAdmin = true;
        userDTO.isLocked = false;
        userDTO.pictureURL = "admin.png";
        userDTO.lastLogin = new Date();
        let newUserDTO = await context.usersService.createOne(userDTO, errors);
        expect(newUserDTO).not.toBe(null);
        expect(newUserDTO.email).toBe("admin@coolcaddy.com");
        expect(newUserDTO.password).toBe("123");
        expect(newUserDTO.isAdmin).toBe(true);
        expect(newUserDTO.isLocked).toBe(false);
        expect(newUserDTO.pictureURL).toBe("admin.png");
        newUserDTO.email = "user@coolcaddy.com";
        let updatedUserDTO = await context.usersService.updateOne(newUserDTO, newUserDTO.id, errors);
        expect(updatedUserDTO).toBe(null);
        //No puede valer algo dado que su valor es null;
        // expect(updatedUserDTO.email).toBe("user@coolcaddy.com");
        newUserDTO.kind = "guselas@coolcaddy.com";
        updatedUserDTO = await context.usersService.updateOne(newUserDTO, newUserDTO.id, errors);
        expect(updatedUserDTO).toBe(null);
    }
});

test('ReadAll RecordsDTO', async () => {
    let context = new UserContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var filter = {};
        var errors = [];
        let usersDTO = await context.usersService.readAll(filter, errors);
        expect(usersDTO).not.toBe(null);
        expect(usersDTO.length).toBe(2);
    }
});

test('Delete a record', async () => {
    let context = new UserContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let usersDTO = await context.usersService.findUsersByEmail("user@coolcaddy.com", errors);
        expect(usersDTO).not.toBe(null);
        expect(usersDTO.length).toBe(1);
        expect(usersDTO[0].password).toBe("123");
        let userDTO = usersDTO[0];
        let deletedResult = await context.usersService.deleteOne(userDTO.id, errors);
        expect(deletedResult).toBe(true);
    }
});

test('Deleting twice the same record', async () => {
    let context = new UserContext("localhost", "coolCaddyTest");
    let connection = await context.connect("localhost", "coolCaddyTest");
    if (connection) {
        var errors = [];
        let usersDTO = await context.usersService.findUsersByEmail("admin@coolcaddy.com", errors);
        expect(usersDTO).not.toBe(null);
        expect(usersDTO.length).toBe(1);
        expect(usersDTO[0].password).toBe("123");
        let userDTO = usersDTO[0];
        let deletedResult = await context.usersService.deleteOne(userDTO.id, errors);
        expect(deletedResult).toBe(true);
        let deleted2Result = await context.usersService.deleteOne(userDTO.id, errors);
        expect(deleted2Result).toBe(false);
    }
});