const ProductService = require('../services/product-service');

const productService = new ProductService();

const create = async (req, res) => {
    try {
        const response = await productService.createProduct(req.user, req.body);
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new product',
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
    create
}
