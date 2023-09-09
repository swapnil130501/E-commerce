const UserService  = require('../services/user-service');

const userService  = new UserService();

const signup = async (req, res) => {
    try {
        const response = await userService.signup({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        });
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new user',
            data: response,
            err: {}
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            err: err
        });
    }
}

module.exports = {
    signup
}