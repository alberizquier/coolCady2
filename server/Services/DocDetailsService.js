const CrudService = require('./CrudService');
const DocDetailDAO = require('../DAO/DocDetailDAO');
const DocDetailDTO = require('../DTO/DocDetailDTO');
const FullDocDetailDTO = require('../DTO/FullDocDetailDTO');

class DocDetailService extends CrudService {
    constructor(services) {
        super("DocDetailService", DocDetailDAO, DocDetailDTO, FullDocDetailDTO, services);
    }

    async fillFieldsFullDTO(fullStockDTO, errors) {
        fullStockDTO.product = await this.loadStockProduct(fullStockDTO.productId, errors);
        return fullStockDTO;
    }

    async loadStockProduct(id, errors) {
        return await this.services.productsService.readOne(id, errors);
    }
  
}
module.exports = DocDetailService;