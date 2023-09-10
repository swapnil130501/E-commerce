const { UserRepository } = require('../repository/index');
const { JWT_KEY } = require('../config/server-config');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async getUserByEmail(email) {
        try {
            const user = await this.userRepository.findBy({email});
            return user;
        } catch(error) {
            throw error;
        }
    }

    async signUp(data){
        try {
            console.log(data);
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            throw error;
        }
        
    }

    async signIn(email, plainPassword) {
        try {
            // step 1-> fetch the user using the email
            const user = await this.getUserByEmail(email);
            // step 2-> compare incoming plain password with the stored encrypted password
            const passwordsMatch = this.checkPassword(plainPassword, user.password);

            if(!passwordsMatch) {
                console.log("Password doesn't match");
                throw {error: 'Incorrect password'};
            }
            // step 3-> if the passwords match, create a token and send it to the user
            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in the sign in process");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error: 'Invalid token'};
            }
            const user = this.getUserByEmail(response.id);
            if(!user){
                throw {error: 'No user with the corresponding email exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in auth process");
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }
    isAdmin(userId){
        try {
            const response =  this.userRepository.isAdmin(userId);
            return response;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }
}

module.exports = UserService;