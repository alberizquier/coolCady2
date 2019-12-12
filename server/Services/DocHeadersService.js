const CrudService = require('./CrudService');
const DocHeaderDAO = require('../DAO/DocHeaderDAO');
const DocHeaderDTO = require('../DTO/DocHeaderDTO');
const FullDocHeaderDTO = require('../DTO/FullDocHeaderDTO');
const DocDetailDTO = require('../DTO/DocDetailDTO');

class DocHeaderService extends CrudService {
    constructor(services) {
        super("DocHeaderService", DocHeaderDAO, DocHeaderDTO, FullDocHeaderDTO, services);
    }

    async fillFieldsFullDTO(fullDocHeaderDTO, errors) {
        fullDocHeaderDTO.coffeeShop = await this.loadStockCofeeShop(fullDocHeaderDTO.coffeeShopId, errors);
        fullDocHeaderDTO.docDetails = await this.loadDocHeaderDocDetails(fullDocHeaderDTO.id, errors);
        return fullDocHeaderDTO;
    }

    async loadStockCofeeShop(id, errors) {
        return await this.services.coffeeShopsService.readOne(id, errors);
    }

    async loadDocHeaderDocDetails(docHeaderId, errors) {
        let result = [];
        let filter = {
            docHeaderId: docHeaderId
        };
        var docDetailsDTO = await this.services.docDetailsService.readAll(filter, errors);
        if (docDetailsDTO) {
            for (let docDetailDTO of docDetailsDTO) {
                let fullDocDetailDTO = await this.services.docDetailsService.readFullOne(docDetailDTO.id, errors);
                if (fullDocDetailDTO) {
                    result.push(fullDocDetailDTO);
                }
            }
        }
        return result;
    }

    async newCaddy(coffeShopId, errors) {
        let docHeaderDTO = this.model();
        docHeaderDTO.coffeShopId = coffeShopId;
        docHeaderDTO.year = 2019;
        docHeaderDTO.docNumber = 1;
        docHeaderDTO.sellerId = "gus";
        docHeaderDTO.clientId = "alber";
        docHeaderDTO.paymentMethod = "cash";
        docHeaderDTO.docState = "open";
        docHeaderDTO = await this.createOne(docHeaderDTO, errors);
        if (docHeaderDTO) {
            fullDocHeaderDTO = await this.readFullOne(docHeaderDTO.id, errors);
            return fullDocHeaderDTO;
        }
        return null;
    }

    async addProduct(docHeaderId, docDetailDTO, errors) {
    //Busco el docHeader(caddy) ya existente
        let docHeaderDTO = await this.readOne(docHeaderId, errors);
        if (docHeaderDTO) {
            //añado el detail que me viene al caddy
            docDetailDTO.docHeaderId = docHeaderId;
            // recalculo los importes actualizando el caddy
            let totalLine = docDetailDTO.quantity * docDetailDTO.price;
            docHeaderDTO.amountBaseN += totalLine;
            //Actualizo el caddy
            docHeaderDTO = await this.updateOne(docHeaderDTO, docHeaderId, errors);
            //Añado el product y su quantity
            docDetailDTO = await this.services.docDetailsService.createOne(docDetailDTO, errors);
            
            if (docHeaderDTO) {
                //leo el caddy completo
                let fullDocHeaderDTO = await this.readFullOne(docHeaderDTO.id, errors);
                return fullDocHeaderDTO;
            }
        }
        return null;
    }
}
module.exports = DocHeaderService;