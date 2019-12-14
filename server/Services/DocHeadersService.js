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

    async newCaddy(coffeeShopId, errors) {
        let docHeaderDTO = this.model();
        docHeaderDTO.coffeeShopId = coffeeShopId;
        docHeaderDTO.year = 2019;
        docHeaderDTO.docNumber = 1;
        docHeaderDTO.sellerId = "gus";
        docHeaderDTO.clientId = "alber";
        docHeaderDTO.paymentMethod = "cash";
        docHeaderDTO.docState = "open";
        docHeaderDTO.amountDue = 0;
        docHeaderDTO.amountPayed = 0;
        docHeaderDTO.taxBaseR = 0;
        docHeaderDTO.taxBaseS = 0;
        docHeaderDTO.taxBaseN = 0;

        docHeaderDTO.percentageBaseR = 0.1;
        docHeaderDTO.percentageBaseS = 0.07;
        docHeaderDTO.percentageBaseN = 0.21;

        docHeaderDTO = await this.createOne(docHeaderDTO, errors);
        if (docHeaderDTO) {
            let fullDocHeaderDTO = await this.readFullOne(docHeaderDTO.id, errors);
            return fullDocHeaderDTO;
        }
        return null;
    }

    async calculateTotals(docHeaderId, errors) {
        //localizamos el headerDTO
        let docHeaderDTO = await this.readOne(docHeaderId, errors);
        if (docHeaderDTO) {
            //localizamos los detailsDTO(docHeaderDTO.id) asociados
            var docDetailsDTO = await this.services.docDetailsService.readAll({
                docHeaderId: docHeaderId
            }, errors);
            if (docDetailsDTO) {
                //Ponemos a 0 los totales
                docHeaderDTO.amountDue = 0;
                docHeaderDTO.amountPayed = 0;

                docHeaderDTO.taxBaseR = 0;
                docHeaderDTO.taxBaseS = 0;
                docHeaderDTO.taxBaseN = 0;
                docHeaderDTO.totalItems = 0;

                //recorremos todos los detalles
                for (let docDetailDTO of docDetailsDTO) {
                    docHeaderDTO.totalItems += docDetailDTO.quantity;
                    //vamos acumulando en taxBaseX += docDetailDTO.price * docDetailDTO.quantity;
                    switch (docDetailDTO.vatKind) {
                        case "N":
                            docHeaderDTO.taxBaseN += docDetailDTO.price * docDetailDTO.quantity
                            break;
                        case "S":
                            docHeaderDTO.taxBaseS += docDetailDTO.price * docDetailDTO.quantity
                            break;
                        case "R":
                        default:
                            docHeaderDTO.taxBaseR += docDetailDTO.price * docDetailDTO.quantity
                            break;
                    }
                }
                docHeaderDTO.amountDue =
                    docHeaderDTO.taxBaseR * (1 + docHeaderDTO.percentageBaseR) +
                    docHeaderDTO.taxBaseN * (1 + docHeaderDTO.percentageBaseN) +
                    docHeaderDTO.taxBaseS * (1 + docHeaderDTO.percentageBaseS);
                //actualizamos headerDTO
                docHeaderDTO = await this.updateOne(docHeaderDTO, docHeaderDTO.id, errors);
                if (docHeaderDTO) {
                    return true;
                }
            }
        }
        return false;
    }

    async addProduct(docHeaderId, docDetailDTO, errors) {
        //Busco el docHeader(caddy) ya existente
        let docHeaderDTO = await this.readOne(docHeaderId, errors);
        if (docHeaderDTO) {
            //añado el detail que me viene al caddy
            //normalizo los campos
            docDetailDTO.docHeaderId = docHeaderId;
            if ("RSN".indexOf(DocDetailDTO.vatKind) < 0) {
                DocDetailDTO.vatKind = "R";
            }
            //busco el docDetail con el filtro carrito-producto 
            var docDetailsDTO = await this.services.docDetailsService.readAll({
                docHeaderId: docHeaderId,
                productId: docDetailDTO.productId
            }, errors);
            //Si no ha habido fallos buscando detalles (carrito-producto) 
            if (docDetailsDTO) {
                //comprobar si el array de docDetails es de 0
                if (docDetailsDTO.length == 0) {
                    //Si no hay ninguno añadirlo al caddy
                    docDetailDTO = await this.services.docDetailsService.createOne(docDetailDTO, errors);
                } else {
                    //Si ese producto ya exite en docDetails solo hemos de sumar +1 quantity
                    let quantity = docDetailDTO.quantity;
                    docDetailDTO = docDetailsDTO[0];
                    docDetailDTO.quantity += quantity;
                    docDetailDTO = await this.services.docDetailsService.updateOne(docDetailDTO, docDetailDTO.id, errors);
                }
                if (!docDetailDTO) {
                    return null;
                }
                //Actualizo los totales del caddy  
                let result = await this.calculateTotals(docHeaderId, errors);
                if (!result) {
                    return null;
                }
                //Devuelvo el caddy completo
                if (docHeaderDTO) {
                    //leo el caddy completo
                    let fullDocHeaderDTO = await this.readFullOne(docHeaderDTO.id, errors);
                    return fullDocHeaderDTO;
                }
            }
        }
        return null;
    }

    async removeProduct(docHeaderId, docDetailDTO, errors) {
        //Busco el docHeader(caddy) ya existente
        let caddyDTO = await this.readOne(docHeaderId, errors);
        if (caddyDTO) {
            var docDetailsDTO = await this.services.docDetailsService.readAll({
                docHeaderId: docHeaderId,
                productId: docDetailDTO.productId
            }, errors);
            if (docDetailsDTO) {
                for (let item of docDetailsDTO) {
                    let quantity = item.quantity - docDetailDTO.quantity;
                    if (quantity > 0) {
                        //Disminuimos la cantidad y actualizamos
                        item.quantity = quantity;
                        docDetailDTO = await this.services.docDetailsService.updateOne(item, item.id, errors);
                        if (!docDetailDTO) {
                            return null;
                        }
                    } else {
                        //Como la quantity es <= 0 eliminamos el registro
                        let deleted = await this.services.docDetailsService.deleteOne(item.id, errors);
                        if (!deleted) {
                            return null;
                        }
                    }
                }
            }
            let result = await this.calculateTotals(docHeaderId, errors);
            if (!result) {
                return null;
            }
            if (caddyDTO) {
                //devuelvo el caddy completo
                let fullDocHeaderDTO = await this.readFullOne(caddyDTO.id, errors);
                return fullDocHeaderDTO;
            }
        }
        return null;
    }

    async removeSelection(docDetailId, errors) {
        //Busco el docDetailId(caddy) ya existente
        let docDetailDTO = await this.services.docDetailsService.readOne(docDetailId, errors);
        if (docDetailDTO) {
            let deleted = await this.services.docDetailsService.deleteOne(docDetailId, errors);
            if (!deleted) {
                return null;
            }
            let result = await this.calculateTotals(docDetailDTO.docHeaderId, errors);
            if (!result) {
                return null;
            }
                //devuelvo el caddy completo
                let fullDocHeaderDTO = await this.readFullOne(docDetailDTO.docHeaderId, errors);
                return fullDocHeaderDTO;
        }
        return null;
    }
}
module.exports = DocHeaderService;