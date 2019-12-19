const BaseAPI = require('./BaseAPI');

class CaddyAPI extends BaseAPI {
    constructor(uri, app, nameAPI,caddyService) {
        super(uri, app, nameAPI);
        this.caddyService = caddyService;

        app.get(`${uri}/shops`, this.getAllShops.bind(this));
        app.get(`${uri}/shops/:coffeeShopId`, this.getShop.bind(this));

        app.post(`${uri}/caddy/:coffeeShopid`, this.newCaddy.bind(this));
        app.post(`${uri}/caddy/:caddyId/close`, this.closeCaddy.bind(this));
        app.post(`${uri}/caddy/product/:caddyId`, this.addProduct.bind(this));
        app.delete(`${uri}/caddy/product/:caddyId`, this.removeProduct.bind(this));
        app.delete(`${uri}/caddy/selection/:docDetailId`, this.removeSelection.bind(this));


    }

    async getAllShops(req, res) {
        console.log(`API ${this.nameAPI}: getAllShops(): `);
        //Normalize filterValues from query
        const filter = {};
        let recordDAO = new this.caddyService.DAO.CoffeeShopDAO();
        for (let prop in req.query) {
            if (prop in recordDAO) {
                if (typeof recordDAO[prop] == "string") {
                    filter[prop] = {
                        $regex: req.query[prop]
                    };
                } else if (recordDAO[prop] instanceof Date) {
                    try {
                        var dateDirty = new Date(req.query[prop]);
                        var dateClean = new Date(dateDirty.getFullYear(), dateDirty.getMonth(), dateDirty.getDay());
                        filter[prop] = dateClean.toISOString();
                    } catch (error) {

                    }
                } else {
                    filter[prop] = req.query[prop];
                }
            }
        }
        try {
            let errors = [];
            const recordsDTO = await this.caddyService.services.coffeeShopsService.readAll(filter, errors);
            if (recordsDTO) {
                this.sendData(res, recordsDTO);
            } else {
                this.sendError(res, this.ST_BadRequest, "readAll()", errors);
            }
        } catch (err) {
            this.sendError(res, this.ST_InternalServerError, "readAll()", err.message);
        };
    }

    async getShop(req, res) {
        console.log(`API ${this.nameAPI}: getShop(): `);
        const id = req.params.coffeeShopId;
        try {
            const errors = [];
            const fullRecordDTO = await this.caddyService.services.coffeeShopsService.readFullOne(id, errors);
            if (fullRecordDTO) {
                this.sendData(res, fullRecordDTO)
            } else {
                this.sendError(res, this.ST_NotFound, "readFullOne()", errors);
            }
        } catch (err) {
            this.sendError(res, this.ST_InternalServerError, "readFullOne()", err.message);
        };
    }

    async newCaddy(req, res) {
        console.log(`API caddy newCaddy()`);
        const coffeeShopId = req.params.coffeeShopId;
        try {
            const errors = [];
            const caddyDTO = await this.caddyService.newCaddy(coffeeShopId, errors);
            if (caddyDTO) {
                this.sendData(res, caddyDTO)
            } else {
                this.sendError(res, this.ST_NotFound, "newCaddy()", errors);
            }
        } catch (err) {
            this.sendError(res, this.ST_InternalServerError, "newCaddy()", err.message);
        };
    }

    async closeCaddy(req, res) {
        console.log(`API caddy closeCaddy()`);
        const caddyId = req.params.caddyId;
        try {
            const errors = [];
            const orderDTO = await this.caddyService.closeCaddy(caddyId, errors);
            if (orderDTO) {
                this.sendData(res, orderDTO)
            } else {
                this.sendError(res, this.ST_NotFound, "closeCaddy()", errors);
            }
        } catch (err) {
            this.sendError(res, this.ST_InternalServerError, "closeCaddy()", err.message);
        };
    }

    async addProduct(req, res) {
        console.log(`API caddy addProduct()`);
        const caddyId = req.params.caddyId;
        try {
            var errors = [];
            var docDetailDTO = new this.caddyService.DTO.DocDetailDTO();
            this.loadDTOFromBody(docDetailDTO, req.body);
            const caddyDTO = await this.caddyService.addProduct(caddyId, docDetailDTO, errors);
            if (caddyDTO) {
                this.sendData(res, caddyDTO)
            } else {
                this.sendError(res, this.ST_NotFound, "addProduct()", errors);
            }
        } catch (err) {
            this.sendError(res, this.ST_InternalServerError, "addProduct()", err.message);
        };
    }

    async removeProduct(req, res) {
        console.log(`API caddy removeProduct()`);
        const caddyId = req.params.caddyId;
        try {
            var errors = [];
            var docDetailDTO = new this.caddyService.DTO.DocDetailDTO();
            this.loadDTOFromBody(docDetailDTO, req.body);
            const caddyDTO = await this.caddyService.removeProduct(caddyId, docDetailDTO, errors);
            if (caddyDTO) {
                this.sendData(res, caddyDTO)
            } else {
                this.sendError(res, this.ST_NotFound, "removeProduct()", errors);
            }
        } catch (err) {
            this.sendError(res, this.ST_InternalServerError, "removeProduct()", err.message);
        };
    }

    async removeSelection(req,res){
        console.log(`API caddy removeSelection()`);
        const docDetailid = req.params.docDetailId;
        try {
            var errors = [];
            const caddyDTO = await this.caddyService.removeSelection(docDetailid, errors);
            if (caddyDTO) {
                this.sendData(res, caddyDTO)
            } else {
                this.sendError(res, this.ST_NotFound, "removeSelection()", errors);
            }
        } catch (err) {
            this.sendError(res, this.ST_InternalServerError, "removeSelection()", err.message);
        };
    }
}

module.exports = CaddyAPI;