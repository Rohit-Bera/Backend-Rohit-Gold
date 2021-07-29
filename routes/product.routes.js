const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const admincheck = require("../middlewares/admincheck");

const multer = require("multer");
const path = require("path");

//image
const storage = multer.diskStorage({
  destination: "./upload/productimages",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

const {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductbyname,
  getAllProduct,
  getSearchProduct,
} = require("../controllers/product.controller");

router.post(
  "/addProduct",
  auth,
  admincheck,
  upload.array("productImage", 4),
  addProduct
);
//users
router.get("/getProduct", getProduct);
//users
router.get("/getProductbyname/:name", getProductbyname);

//search product
router.get("/getSearchProduct/:name", getSearchProduct);

//admin
router.get("/getallproduct", auth, admincheck, getAllProduct);

router.put(
  "/updateproduct/:id",
  auth,
  admincheck,
  upload.array("productImage", 4),
  updateProduct
);

router.delete("/deleteproduct/:id", auth, admincheck, deleteProduct);

module.exports = router;
