const BaseService = require('./BaseService');

class CrudService extends BaseService {
    constructor(nameService, classDAO, classDTO, fullClassDTO, services) {
        super();
        this.nameService = nameService;
        this.classDAO = classDAO;
        this.classDTO = classDTO;
        this.fullClassDTO = fullClassDTO;
        this.services = services.services;
        this.DAO = services.DAO;
        this.DTO = services.DTO;
    }

    postModel() {
        //model to use when createOne()
        var postModelDTO = new this.classDTO();
        return postModelDTO.postModel();
    }


    putModel() {
        //model to use when updateOne()
        var putModelDTO = this.model();
        return putModelDTO.putModel();
    }

    model() {
        return new this.classDTO();
    }

    fullModel() {
        return new this.fullClassDTO();
    }

    async readAll(filter, errors) {
        //creo un array vacio para insertar todos los registros a la lista
        let allRecordsDTO = [];
        //con el filtro que te he pasado encuentra todos los registros que cumplan el filtro
        let allRecordsDAO = await this.classDAO.find(filter);
        if (allRecordsDAO) {
            //recorro esa lista
            for (let recordDAO of allRecordsDAO) {
                //para cada registro de esa lista instancio un nuevo objeto de de la clase ClassDTO
                let recordDTO = new this.classDTO();
                //a mi lista inserto cada el lemento que cumpla el filtro, habiendo previamente tranformado de DAO a DTO.
                allRecordsDTO.push(recordDTO.fromDAO(recordDAO));
            }
        }
        //devuelvo la lista de todos los resgistro que cumplen el filtro. 
        return allRecordsDTO;
    }

    

    async readOne(id, errors) {
        //Busco un registro DAO y si se encuentra lo traspaso a un nuevo registro DTO y lo devuelvo.
        let recordDAO = await this.classDAO.findById(id);
        if (recordDAO) {
            let recordDTO = this.model();
            recordDTO.fromDAO(recordDAO);
            return recordDTO;
        }
        errors.push(`${this.nameService}.readOne(): Id "${id}" not found`);
        return null;
    }

    //Virtual method
    async fillFieldsFullDTO(recordFullDTO,errors) {
        //TO Be override by the derived service 
        return recordFullDTO;
    }


    async readFullOne(id, errors) {
        let recordDAO = await this.classDAO.findById(id);
        if (recordDAO) {
            let recordFullDTO = this.fullModel();
            recordFullDTO.fromDAO(recordDAO);
            recordFullDTO = await this.fillFieldsFullDTO(recordFullDTO, errors);
            return recordFullDTO;
        }
        errors.push(`${this.nameService}.readFullOne(): Id "${id}" not found`);
        return null;
    }

    //Virtual method
    async checkFieldsId(recordDTO, errors) {
        var ok = true;
        //TO Be override by the derived service 
        return ok;
    }

    //Virtual method
    async canCreateOne(recordDTO, errors) {
        return await this.checkFieldsId(recordDTO, errors);
    }

    async createOne(recordDTO, errors) {
        if (await this.canCreateOne(recordDTO, errors)) {
            var recordDAO = recordDTO.toDAO(this.classDAO());
            recordDAO = await recordDAO.save(recordDAO);
            recordDTO.fromDAO(recordDAO);
            return recordDTO.putModel();
        }
        return null;
    }

    //Virtual method
    async canUpdateOne(recordDTO, errors) {
        return await this.checkFieldsId(recordDTO, errors);
    }

    async updateOne(recordDTO, id, errors) {
        if (await this.canUpdateOne(recordDTO, errors)) {
            var recordDAO = await this.classDAO.findById(id);
            if (recordDAO) {
                if (recordDTO.rowVersion !== recordDAO.__v) {
                    errors.push(`${this.nameService}.updateOne(): invalid rowVersion`);
                    return null;
                } else {
                    recordDTO.toDAO(recordDAO);
                    recordDAO.__v++;
                    recordDAO = await recordDAO.save();
                    recordDTO.fromDAO(recordDAO);
                    return recordDTO.putModel();
                }
            }
            errors.push(`${this.nameService}.updateOne(): Id "${id}" not found`);
        }
        return null;
    }

    //Virtual method
    async canDeleteOne(id, errors) {
        var ok = true;
        //Find related tables
        /*To Be implemented by derived class
        var hasBudgetDetails = false;
         var budgetDetails = await BudgetDetailDAO.find({ experienceId: experienceId }).limit(1);
         if (budgetDetails) {
             hasBudgetDetails = true;
             errors.push(`ExperienceService.canDelete(): the budget can't be deleted because it has details associated to it`);
         }
         */
        //other relations

        //end verificaton
        return ok;
    }

    async deleteOne(id, errors) {
        if (await this.canDeleteOne(id, errors)) {
            const recordDAO = await this.classDAO.findById(id);
            if (recordDAO) {
                await this.classDAO.deleteOne({
                    _id: id
                });
                return true;
            }
            errors.push(`${this.nameService}.deleteOne(): Id "${id}" not found`);
        }
        return false;
    }

}
module.exports = CrudService;