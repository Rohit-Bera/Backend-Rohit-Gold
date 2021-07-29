const Product = require("../models/productModel");
const fs = require("fs");

const addProduct = async (request, response) => {
  const {
    productName,
    collectionName,
    price,
    weight,
    purity,
    category,
    availableStatus,
  } = request.body;
  console.log("category: ", category);
  console.log("purity: ", purity);
  console.log("weight: ", weight);
  console.log("price: ", price);
  console.log("collectionName: ", collectionName);
  console.log("productName: ", productName);
  console.log("availabileStatus: ", availableStatus);

  // console.log("body: ", request.body);
  try {
    const pexist = await Product.findOne({ productName });

    if (pexist) {
      return response.status(500).json({ error: "product already exist" });
    }

    const reqfiles = [];
    // console.log("reqfiles: ", reqfiles);
    const url = request.protocol + "://" + request.get("host");

    if (request.files === []) {
      return response.status(500).json({ error: "no file chosen" });
    }

    for (var i = 0; i < request.files.length; i++) {
      reqfiles.push(url + "/productImages/" + request.files[i].filename);
    }

    console.log("reqfiles: ", reqfiles);

    const productImage = reqfiles;

    const theProduct = {
      productName,
      collectionName,
      price,
      weight,
      purity,
      category,
      productImage,
      availableStatus,
    };

    // const dummyProduct = {
    //   productName: "necklace",
    //   collectionName: "rose-gold",
    //   price: 120000,
    //   weight: "1kg",
    //   purity: "24kt",
    //   category: "necklace",
    //   productImage: reqfiles,
    // };

    console.log("theProduct: ", theProduct);

    // console.log("dummyProduct: ", dummyProduct);

    const newProduct = new Product(theProduct);

    await newProduct.save();

    response.status(200).json({ success: "issuccessfull", newProduct });
  } catch (error) {
    console.log("error: ", error);

    response.status(500).json({ fail: "error occured", error });
  }
};

const getProduct = async (request, response) => {
  Product.find((err, product) => {
    if (err) {
      return response.json({ error: "product not found", status: 404 });
    }

    response.json({ status: 200, product });
  });
};

const getProductbyname = async (request, response) => {
  const collectionName = request.params.name;
  // console.log("collectionname: ", collectionName);
  try {
    const product = await Product.find({ collectionName });
    // console.log("product: ", product);

    if (!product) {
      return response.json({ status: 404, error: "product not found" });
    }

    response.json({ status: 200, success: "product found", product });
  } catch (e) {
    console.log("error: ", e);

    response.json({ status: 500, error: "something went wrong" });
  }
};

const getSearchProduct = async (request, response) => {
  const category = request.params.name;
  console.log("productName: ", category);

  try {
    const product = await Product.find({ category });

    if (!product || product === []) {
      return response.json({ status: 404, error: "product not found" });
    }

    console.log("product: ", product);

    response.json({ status: 200, success: "product found", product });
  } catch (e) {
    response.json({ status: 500, error: "something went wrong" });
  }
};

const updateProduct = async (request, response) => {
  const _id = request.params.id;
  const body = request.body;
  console.log("body: ", body);
  console.log("_id: ", _id);

  console.log("files : ", request.files);

  try {
    const firstcheck = await Product.findById({ _id });

    if (!firstcheck) {
      return response.staus(500).json({ error: "product not found" });
    }

    const { productImage } = body;
    // console.log("productImage: ", productImage);

    // const imgfile = productImage[0];

    // const check = imgfile.slice(0, 21);
    // // console.log("check: ", check);

    // const url = request.protocol + "://" + request.get("host");
    // // console.log("url: ", url);

    if (productImage === undefined) {
      const {
        productName,
        collectionName,
        price,
        weight,
        purity,
        category,
        availableStatus,
      } = body;

      const reqfiles = [];
      // console.log("reqfiles: ", reqfiles);
      const url = request.protocol + "://" + request.get("host");

      for (var i = 0; i < request.files.length; i++) {
        reqfiles.push(url + "/productImages/" + request.files[i].filename);
      }

      console.log("reqfiles: ", reqfiles);

      const productImage = reqfiles;

      const theProduct = {
        productName,
        collectionName,
        price,
        weight,
        purity,
        category,
        productImage,
        availableStatus,
      };

      const product = await Product.findByIdAndUpdate(
        { _id },
        { $set: theProduct },
        { new: true }
      );

      response.status(200).json({ success: "issuccessfull", product });
    } else {
      const product = await Product.findByIdAndUpdate(
        { _id },
        { $set: body },
        { new: true }
      );

      response.status(200).json({ success: "issuccessfull", product });
    }
  } catch (error) {
    console.log("error: ", error);

    return response.status(500).json({ error: "something went wrong" });
  }
};

const deleteProduct = async (request, response) => {
  const _id = request.params.id;

  try {
    const product = await Product.findByIdAndDelete({ _id });

    if (!product) {
      return response.status(500).json({ error: "product not found" });
    }

    const { productImage } = product;
    console.log("productImage: ", productImage);

    const path = [];

    const location = [];

    for (var i = 0; i < productImage.length; i++) {
      path.push(productImage[i].slice(36, 66));
      location.push(`./upload/productimages/${path[i]}`);
      fs.unlinkSync(location[i]);
    }

    console.log("path: ", path);
    console.log("location: ", location);

    response
      .status(200)
      .json({ success: "product has been deleted..", product });
    console.log("deleted product is : ", product);
  } catch (error) {
    console.log("error: ", error);
    response.status(500).json({ error: "something went wrong." });
  }
};

const getAllProduct = async (request, response) => {
  try {
    const allproducts = await Product.find();

    // if (!allproducts) {
    //   return response.json({ status: 404, error: "products not found" });
    // }

    response.json({ status: 200, allproducts, success: "products found" });
  } catch (e) {
    console.log("e: ", e);

    response.json({ status: 500, error: "something went wrong" });
  }
};

module.exports = {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductbyname,
  getAllProduct,
  getSearchProduct,
};
