const VATDTO = require('./VATDTO');


class FullVATDTO extends VATDTO {
    constructor() {
        super();
        this["$type"] = "FullVATDTO";
    }

}


module.exports = FullVATDTO;