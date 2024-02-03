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


// Create New Review or Update the review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user.id.toString()); // checking.. You have already reviewed or not 

    if (isReviewed) {
        //  Updating the Review
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user.id.toString()) {
                (rev.rating = rating), (rev.comment = comment);
            }
        })
    } else {
        // Creating new review
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach(rev => {
        avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })
});


// Get All Review of a Product 

exports.getProductReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
})

// Delete Review of a Product 

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

    let avg = 0;

    reviews.forEach(rev => {
        avg += rev.rating;
    });
    const ratings = (avg / reviews.length);
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, { reviews, ratings, numOfReviews },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
})


