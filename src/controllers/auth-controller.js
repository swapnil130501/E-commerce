const UserService  = require('../services/user-service');

const userService  = new UserService();

const signUp = async (req, res) => {
    try {
        const response = await userService.signUp({
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

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            success: true,
            data: response,
            err: {},
            message: 'Successfully signed in'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.deleteUser(req.params.id, token);
        return res.status(200).json({
            data: response,
            message: "Successfully deleted User",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot delete User",
            err: error,
            success: false
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.updateUser(req.params.id, req.body, token);
        return res.status(200).json({
            data: response,
            message: "Successfully updated User",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot update User",
            err: error,
            success: false
        });
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            data: response,
            err: {},
            message: 'User is authenticated and token is valid'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

const isAdmin = async (req, res) => {
    try {
        const response = await userService.isAdmin(req.body._id);
        return res.status(200).json({
            success: true,
            data: response,
            err: {},
            message: 'Successfully fetched whether user is admin or not'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

module.exports = {
    signUp,
    signIn,
    deleteUser,
    updateUser,
    isAuthenticated,
    isAdmin
}