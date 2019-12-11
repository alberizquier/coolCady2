var mongoose = require('mongoose');
var Seed = require('../server/Services/Seed');
var data = require('../server/data/data');

const Services = require('./Services/Services');
var services = new Services();

const VATDAO = require('./DAO/VATDAO');
const VATDTO = require('./DTO/VATDTO');
const FullVATDTO = require('./DTO/FullVATDTO');
const VATsService = require('./Services/VATsService');
services.DAO.VATDAO = VATDAO;
services.DTO.VATDTO = VATDTO;
services.DAO.FullVATDTO = FullVATDTO;

services.services.vatsService = new VATsService(services);

async function startApp() {
    try {
        const connection = await mongoose.connect('mongodb://localhost/coolCaddy', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Mongoose Connected!");
        appInit();
    } catch (error) {
        console.log("Couldn't connect to Mongoose/coolCaddy");
    }
}


async function appInit() {
    const seed = new Seed(data);
    await seed.seed();
}



startApp();