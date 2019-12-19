const CrudService = require('./CrudService');
const DocHeaderDAO = require('../DAO/DocHeaderDAO');
const DocHeaderDTO = require('../DTO/DocHeaderDTO');
const FullDocHeaderDTO = require('../DTO/FullDocHeaderDTO');


const DocDetailDAO = require('../DAO/DocDetailDAO');
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

}
module.exports = DocHeaderService;