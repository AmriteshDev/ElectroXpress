const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");




// Create Product --- Admin
exports.createProduct = catchAsyncErrors(
    async (req, res, next) => {

        req.body.user = req.user.id;   //  Who have created the product

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        });
    }
);


//  Get All pruduct
exports.getAllProducts = catchAsyncErrors(
    async (req, res) => {

        const resultPerPage = 5;
        const productCount = await Product.countDocuments();
        const apifeatures = new ApiFeatures(Product.find(), req.query)
            .search()
            .filter().pagination(resultPerPage);

        const products = await apifeatures.query;
        res.status(200).json({
            success: true,
            products,
            productCount
        });
    }
);

// GetProduct Details

exports.getProductDetails = catchAsyncErrors(
    async (req, res, next) => {

        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        res.status(200).json({
            success: true,
            product
        });


    }
);

// Update Product-- Admin

exports.updateProduct = catchAsyncErrors(
    async (req, res, next) => {

        let product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false });
        res.status(200).json({
            success: true,
            product
        });

    }
);


// Delete Product -- Admin

exports.deleteProduct = catchAsyncErrors(
    async (req, res, next) => {
        const product = await Product.findById(req.params.id);
        console.log(product)
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product Delete Successfully"
        });

    }
);


