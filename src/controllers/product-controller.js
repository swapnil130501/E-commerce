const ProductService = require('../services/product-service');

const productService = new ProductService();

const createProduct = async (req, res) => {
    try {
        const response = await productService.createProduct(req.body, req.body.userId);
        return res.status(200).json({
            data: response,
            message: "Successfully created a Product",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot create a Product",
            err: error,
            success: false
        });
    }
}

const getProduct = async (req, res) => {
    try {
        const response = await productService.getProduct(req.params.id);
        return res.status(200).json({
            data: response,
            message: "Successfully fetched Product",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot fetch Product",
            err: error,
            success: false
        });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const response = await productService.getAllProducts(req.query.offset, req.query.limit);
        return res.status(200).json({
            data: response,
            message: "Successfully fetched Products",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot fetch Products",
            err: error,
            success: false
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const response = await productService.deleteProduct(req.params.id, req.body.userId);
        return res.status(200).json({
            data: response,
            message: "Successfully deleted the Product",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot delete the Product",
            err: error,
            success: false
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const response = await productService.updateProduct(req.params.id, req.body, req.body.userId);
        return res.status(200).json({
            data: response,
            message: "Successfully updated the Product",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot update the Product",
            err: error,
            success: false
        });
    }
}

module.exports = {
    createProduct,
    getProduct,
    getAllProducts,
    deleteProduct,
    updateProduct
}
