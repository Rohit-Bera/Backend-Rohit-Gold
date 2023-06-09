//selectors..
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const nodemon = require("nodemon");
const bodyparser = require("body-parser");
const { request, response } = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
require("dotenv").config();

//connection part
//app declared..
const app = express();

//body-parser;
app.use(bodyparser.json());

//cors connection
app.use(cors());

app.use(express.static("public"));

//mongo-connection
const mongoUri = process.env.MONGODBURI;

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("congrats your database got connected.");
    console.log("----------------------------------------------------------");
  })
  .catch((err) => {
    console.log("failed to connect database");
  });

//importing routes from routes-folder
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const WishlistRoutes = require("./routes/wishlist.routes");
const collectionRoutes = require("./routes/collection.routes");
const chatRoutes = require("./routes/chat.routes");
const conversationRoutes = require("./routes/conversation.routes");
const { on } = require("./models/userModel");

//to acces images this link is use
app.use("/collectionimages", express.static("upload/images"));
app.use("/productimages", express.static("upload/productimages"));

// <----Routes---->
//user-routes
app.use(userRoutes);

//product-routes
app.use(productRoutes);

//order-routes
app.use(orderRoutes);

//wishlist-routes
app.use(WishlistRoutes);

//collection routes
app.use(collectionRoutes);

//chat
app.use(chatRoutes);

//conversation
app.use(conversationRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ success: "render is working!" });
});

//server
const server = http.createServer(app);

//listen
const port = process.env.PORT || 5800;
server.listen(port, () => {
  console.log(`server is on port : ${port}`);
});
