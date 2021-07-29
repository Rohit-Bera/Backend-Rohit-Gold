const Collection = require("../models/collectionModel");

const fs = require("fs");

const multer = require("multer");

const addCollection = async (request, response) => {
  try {
    console.log("request.body : ", request.body);

    const { nameofCollection } = request.body;
    // console.log("nameofCollection: ", nameofCollection);

    const existCollection = await Collection.findOne({ nameofCollection });

    if (existCollection) {
      return response
        .status(500)
        .json({ warning: "Collection with this name already exist" });
    }

    // upoload img formula
    console.log("files :", request.file);

    const imgofCollection = `http://localhost:5800/collectionimages/${request.file.filename}`;

    const theCollection = { imgofCollection, nameofCollection };
    console.log("theCollection: ", theCollection);

    const newCollection = new Collection(theCollection);
    console.log("newCollection: ", newCollection);

    await newCollection.save();

    response.status(200).json({
      succes: "isSuccessfull",
      newCollection,
    });
  } catch (error) {
    console.log("error: ", error);

    response.status(500).json({ warning: "something went wrong" });
  }
};

const deleteCollection = async (request, response) => {
  const _id = request.params.id;

  // console.log("files :", request.file);

  try {
    const collection = await Collection.findByIdAndDelete({ _id });

    if (!collection) {
      return response.status(500).json({ error: "collection not found" });
    }

    response.status(200).json({ success: "collection deleted" });
    console.log("collection: ", collection);

    const { imgofCollection } = collection;
    console.log("imgofCollection: ", imgofCollection);

    const imglocation = imgofCollection.slice(39, 72);
    console.log("imglocation: ", imglocation);

    const path = `./upload/images/${imglocation}`;

    fs.unlinkSync(path);

    // fs.unlinkSync(storage);
  } catch (error) {
    console.log("error: ", error);

    response.status(500).json({ fail: "something went wrong" });
  }
};

const getCollection = async (request, response) => {
  try {
    const collections = await Collection.find();

    if (collections) {
      response.status(200).json({ collections });
    } else {
      response.status(500).json({ error: "no collections" });
    }
  } catch (error) {
    console.log("error: ", error);
    response.status(500).json({ warning: "something went wrong" });
  }
};

module.exports = { addCollection, getCollection, deleteCollection };
