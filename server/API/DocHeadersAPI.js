const CrudAPI = require('./CrudAPI');

class DocHeadersAPI extends CrudAPI {
    constructor(uri, app, services) {
        super(uri + '/docheaders', app, "DocHeaders", services.docHeadersService);
    }
}

module.exports = DocHeadersAPI;