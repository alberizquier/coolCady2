const CrudAPI = require('./CrudAPI');


class VATsAPI extends CrudAPI {
    constructor(uri, app,services) {
        super(uri + '/VATs', app, "VATs",services.vatsService);
    }
}

module.exports = VATsAPI;