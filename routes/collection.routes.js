const express = require("express");

const multer = require("multer");
const path = require("path");

const route = express.Router();
const auth = require("../middlewares/auth");
const admincheck = require("../middlewares/admincheck");

//storage engine

const storage = multer.diskStorage({
  destination: "./upload/images",
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
  addCollection,
  getCollection,
  deleteCollection,
} = require("../controllers/collection.controller");

route.post(
  "/addCollection",
  auth,
  admincheck,
  upload.single("imgofCollection"),
  addCollection
);

route.delete("/deleteCollection/:id", auth, admincheck, deleteCollection);

route.get("/getCollection", auth, getCollection);

module.exports = route;
