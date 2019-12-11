const CrudService = require('./CrudService');
const VATDAO = require('../DAO/VATDAO');
const VATDTO = require('../DTO/VATDTO');
const FullVATDTO = require('../DTO/FullVATDTO');

class VATService extends CrudService {
    constructor(services) {
        super("VATService", VATDAO, VATDTO, FullVATDTO, services);
    }


    async canCreateOne(vatDTO, errors) {
        console.log(`${this.nameService}.canCreateOne(${vatDTO.kind}): enters`);
        if (await super.canCreateOne(vatDTO, errors)) {
            var vatsByKind = await this.findVATsByKind(vatDTO.kind, errors);
            if (vatsByKind) {
                if (vatsByKind.length == 0) {
                    return true;
                }
                errors.push(`${this.nameService}.canCreateOne(): Kind "${vatDTO.kind}" duplicated`);
            }
        }
        return false;
    }

    async findVATsByKind(kind, errors) {
        let vatsDTO = [];
        let vatsDAO = await this.DAO.VATDAO.find({
            kind: kind
        });
        if (vatsDAO) {
            for (let vatDAO of vatsDAO) {
                let vatDTO = new this.DTO.VATDTO();
                vatsDTO.push(vatDTO.fromDAO(vatDAO));
            }
        }
        return vatsDTO;
    }

    async canUpdateOne(vatDTO, errors) {
        if (await super.canUpdateOne(vatDTO, errors)) {
            var vatsByKind = await this.findVATsByKind(vatDTO.kind, errors);
            if (vatsByKind) {
                if (vatsByKind.length == 0) {
                    return true;
                }
                if (vatsByKind.length == 1) {
                    return vatsByKind[0].id == vatDTO.id;
                }
            }
        }
        return false;
    }

}
module.exports = VATService;