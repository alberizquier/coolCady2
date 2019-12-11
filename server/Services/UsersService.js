const CrudService = require('./CrudService');
const UserDAO = require('../DAO/UserDAO');
const UserDTO = require('../DTO/UserDTO');
const FullUserDTO = require('../DTO/FullUserDTO');

class UserService extends CrudService {
    constructor(services) {
        super("UserService", UserDAO, UserDTO, FullUserDTO, services);
    }


    async canCreateOne(userDTO, errors) {
        console.log(`${this.emailService}.canCreateOne(${userDTO.email}): enters`);
        if (await super.canCreateOne(userDTO, errors)) {
            var usersByEmail = await this.findUsersByEmail(userDTO.email, errors);
            if (usersByEmail) {
                if (usersByEmail.length == 0) {
                    return true;
                }
                errors.push(`${this.emailService}.canCreateOne(): Email "${userDTO.email}" duplicated`);
            }
        }
        return false;
    }

    async findUsersByEmail(email, errors) {
        let usersDTO = [];
        let usersDAO = await this.DAO.UserDAO.find({
            email: email
        });
        if (usersDAO) {
            for (let userDAO of usersDAO) {
                let userDTO = new this.DTO.UserDTO();
                usersDTO.push(userDTO.fromDAO(userDAO));
            }
        }
        return usersDTO;
    }

    async canUpdateOne(userDTO, errors) {
        if (await super.canUpdateOne(userDTO, errors)) {
            var usersByEmail = await this.findUsersByEmail(userDTO.email, errors);
            if (usersByEmail) {
                if (usersByEmail.length == 0) {
                    return true;
                }
                if (usersByEmail.length == 1) {
                    return usersByEmail[0].id == userDTO.id;
                }
            }
        }
        return false;
    }

}
module.exports = UserService;