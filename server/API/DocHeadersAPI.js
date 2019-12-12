const CrudAPI = require('./CrudAPI');

const DocDetailDTO = require('../DTO/DocDetailDTO');


class DocHeadersAPI extends CrudAPI {
    constructor(uri, app, services) {
        super(uri + '/docheaders', app, "DocHeaders", services.docHeadersService);
        app.post(`${uri}/caddy/:coffeshopid`, this.newCaddy.bind(this));
        app.post(`${uri}/caddy/product/:docHeaderid`, this.addProduct.bind(this));
        app.get(`${uri}/caddy/:id`, this.getCaddy.bind(this));
    }

    async newCaddy(req, res) {
        console.log(`API caddy newCaddy()`);
        const coffeshopid = req.params.coffeshopid;
        try {
            const errors = [];
            const recordDTO = await this.crudService.newCaddy(coffeshopid, errors);
            if (recordDTO) {
                this.sendData(res, recordDTO)
            } else {
                this.sendError(res, this.ST_NotFound, "newCaddy()", errors);
            }
        } catch (err) {
            this.sendError(res, this.ST_InternalServerError, "newCaddy()", err.message);
        };
    }

    async addProduct(req, res) {
        console.log(`API caddy addProduc()`);
        const docHeaderid = req.params.docHeaderid;
        try {
            var errors = [];
            var docDetailDTO = new DocDetailDTO();
            this.loadDTOFromBody(docDetailDTO, req.body);
            const recordDTO = await this.crudService.addProduct(docHeaderid, docDetailDTO, errors);
            if (recordDTO) {
                this.sendData(res, recordDTO)
            } else {
                this.sendError(res, this.ST_NotFound, "addProduct()", errors);
            }
        } catch (err) {
            this.sendError(res, this.ST_InternalServerError, "addProduct()", err.message);
        };
    }

    async getCaddy(req, res) {
        console.log(`API caddy getCaddy()`);

    }

}

module.exports = DocHeadersAPI;