const CrudAPI = require('./CrudAPI');


class VATsAPI extends CrudAPI {
    constructor(uri, app,services) {
        super(uri + '/vats', app, "VATs",services.vatsService);
    }
}

module.exports = VATsAPI;