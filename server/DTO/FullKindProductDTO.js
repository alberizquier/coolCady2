const KindProductDTO = require('./KindProductDTO');


class FullKindProductDTO extends KindProductDTO {
    constructor() {
        super();
        this["$type"] = "FullKindProductDTO";
    }

}


module.exports = FullKindProductDTO;