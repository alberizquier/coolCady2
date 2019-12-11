const UserDTO = require('./UserDTO');


class FullUserDTO extends UserDTO {
    constructor() {
        super();
        this["$type"] = "FullUserDTO";
    }

}


module.exports = FullUserDTO;