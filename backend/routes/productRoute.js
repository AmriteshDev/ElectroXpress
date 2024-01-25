const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReview, deleteReview } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

const router = express.Router();


router.route("/products").get(isAuthenticatedUser, getAllProducts);
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRole("admin"), createProduct);
router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRole("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);



router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router.route("/reviews").get(getProductReview).delete(isAuthenticatedUser, deleteReview)


module.exports = router;