const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

router.route("/products").get(getProducts);
router.route("/products/:id").get(getSingleProduct);
router.route("/admin/product/new").post(newProduct);
router.route("/admin/products/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
