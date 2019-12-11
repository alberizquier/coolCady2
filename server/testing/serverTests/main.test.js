var mongoose = require('mongoose');


const Services = require('../../Services/Services');
var services = new Services();

const VATDAO = require('../../DAO/VATDAO');
const VATDTO = require('../../DTO/VATDTO');
const FullVATDTO = require('../../DTO/FullVATDTO');
const VATsService = require('../../Services/VATsService');
services.DAO.VATDAO = VATDAO;
services.DTO.VATDTO = VATDTO;
services.DAO.FullVATDTO = FullVATDTO;

services.services.vatsService = new VATsService(services);



async function testConnection(host,dbName) {
    try {
        const connection = await mongoose.connect(`mongodb://${host}/${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 4000
        });
        return connection;
    } catch (error) {
        return null;
    }
}


test("I'm connecting to mongodb://localhost/coolCaddyTest", async () => {
    const connection = await testConnection("localhost","coolDaddyTest");
    //expect(testConnection).toHaveBeenCalled();
    expect(connection).not.toBe(null);
},5000);

// test("I'm NOT connecting to mongodb://pepehost/coolCaddyTest", async () => {
//     const connection = await testConnection("dummyHost","coolDaddyTest");
//     //expect(testConnection).toHaveBeenCalled();
//     expect(connection).toBe(null);
// },5000);
