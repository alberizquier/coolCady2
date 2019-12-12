const CrudAPI = require('./CrudAPI');


class DocDetailsAPI extends CrudAPI {
    constructor(uri, app,services) {
        super(uri + '/docdetails', app, "DocDetails",services.docDetailsService);
    }
}

module.exports = DocDetailsAPI;