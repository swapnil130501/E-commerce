const ProductService = require('../services/product-service');

const productService = new ProductService();

const createProduct = async (req, res) => {
    try {
        const response = await productService.createProduct(req.body);
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

module.exports = {
    createProduct,
    getProduct
}
