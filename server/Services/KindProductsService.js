const CrudService = require('./CrudService');
const KindProductDAO = require('../DAO/KindProductDAO');
const KindProductDTO = require('../DTO/KindProductDTO');
const FullKindProductDTO = require('../DTO/FullKindProductDTO');

class KindProductService extends CrudService {
    constructor(services) {
        super("KindProductService", KindProductDAO, KindProductDTO, FullKindProductDTO, services);
    }


    async canCreateOne(kindProductDTO, errors) {
        console.log(`${this.nameService}.canCreateOne(${kindProductDTO.kind}): enters`);
        if (await super.canCreateOne(kindProductDTO, errors)) {
            var kindProductsByKindSubKind = await this.findKindProductsByKind(kindProductDTO.kind, kindProductDTO.subKind, errors);
            if (kindProductsByKindSubKind) {
                if (kindProductsByKindSubKind.length == 0) {
                    return true;
                }
                errors.push(`${this.nameService}.canCreateOne(): Kind "${kindProductDTO.kind}" duplicated`);
            }
        }
        return false;
    }

    async findKindProductsByKindSubKind(kind, subKind, errors) {
        let kindProductsDTO = [];
        let kindProductsDAO = await this.DAO.KindProductDAO.find({
            kind: kind,
            subKind: subKind
        });
        if (kindProductsDAO) {
            for (let kindProductDAO of kindProductsDAO) {
                let kindProductDTO = new this.DTO.KindProductDTO();
                kindProductsDTO.push(kindProductDTO.fromDAO(kindProductDAO));
            }
        }
        return kindProductsDTO;
    }

    async canUpdateOne(kindProductDTO, errors) {
        if (await super.canUpdateOne(kindProductDTO, errors)) {
            var kindProductsByKindSubKind = await this.findKindProductsByKind(kindProductDTO.kind, kindProductDTO.subKind, errors);
            if (kindProductsByKindSubKind) {
                if (kindProductsByKindSubKind.length == 0) {
                    return true;
                }
                if (kindProductsByKindSubKind.length == 1) {
                    return kindProductsByKindSubKind[0].id == kindProductDTO.id;
                }
            }
        }
        return false;
    }

}
module.exports = KindProductService;