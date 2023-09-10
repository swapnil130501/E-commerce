const CrudRepository = require('./crud-repository');
const User = require('../models/user');

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async findBy(data) {
        try {
            const response = await User.findOne(data);
            return response;
        } catch(error) {
            console.log('Something went wrong in repository:', error);
            throw error;
        }
    }

    async isAdmin(userId) {
        try {
            const user = await User.findById(userId);
            if(!user){
                console.log(`User with ID ${userId} not found.`);
                return false;
            }
            if(user.role != 'admin'){
                console.log(`User with ID ${userId} is not an admin.`);
                return false;
            }
            return true;
        } catch (error) {
            console.log('Error in isAdmin:', error);
            throw error;
        }
    }
}

module.exports = UserRepository;