const { request, response } = require("express");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const nodemailer = require("nodemailer");
require("dotenv").config();

const placeOrder = async (request, response) => {
  const { productId } = request.query;
  console.log("productId: ", productId);
  const user = request.user;
  console.log("user: ", user);
  const _id = user._id;
  const username = user.username;
  const email = user.email;

  try {
    console.log("request.query: ", request.query);
    // console.log("productId: ", productId);

    // const exist = await Order.findOne({ product: productId });

    // if (exist) {
    //   return response.json({
    //     error: "product already exist in orders",
    //     status: 302,
    //   });
    // }

    // send email when placed order
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN,
        pass: process.env.PASS,
      },
    });

    var mailOptions = {
      from: process.env.ADMIN,
      to: email,
      subject: "Auto email Message",
      text: `Hello ${username} , you have successfully placed your order . wait for your delievery! . soon your order would be dispatched.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    const order = new Order({ product: productId, owner: { _id } });
    await order.save();

    console.log("orders are : ", order);
    response.status(200).json({ success: "isSuccessfull", status: 200, order });
  } catch (error) {
    console.log("error: ", error);
    response.status(500).json({ error: "something went wrong" });
  }
};

//for user
const myOrders = async (request, response) => {
  const user = request.user;
  const _id = user._id;

  try {
    const myorders = await Order.find({ owner: _id }).populate("product");

    response
      .status(200)
      .json({ success: "isuccessfull", status: 200, myorders });
  } catch (error) {
    console.log("error: ", error);
    response.status(500).json({ error: "something went wrong" });
  }
};

const cancelOrder = async (request, response) => {
  const _id = request.params.id;

  try {
    const exist = await Order.findByIdAndDelete({ _id });

    if (!exist) {
      return response.json({ error: "product not found..", status: 404 });
    }

    response.json({ sucess: "order is deleted..", status: 200 });
  } catch (e) {
    console.log("error: ", e);

    response.json({ error: "something went wrong..", status: 500 });
  }
};

//for admin
const allOrder = async (request, response) => {
  try {
    const orders = await Order.find().populate("owner").populate("product");

    if (orders) {
      return response
        .status(200)
        .json({ sucess: "isSuccessfull", status: 200, orders });
    } else {
      return response.status(500).json({ fail: "isFailure", status: 500 });
    }
  } catch (error) {
    console.log("error: ", error);
    response.status(500).json({ error: "something went wrong" });
  }
};

const updateOrder = async (request, response) => {
  const body = request.body;
  const _id = request.params.id;

  const user = request.user;
  const username = user.username;
  const email = user.email;

  try {
    const updated = await Order.findByIdAndUpdate(
      { _id },
      { $set: body },
      { new: true }
    );

    if (!updated) {
      return response
        .status(500)
        .json({ fail: "isfail", status: 500, error: "order not found" });
    }

    // // send email when delievered order
    // var transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.ADMIN,
    //     pass: process.env.PASS,
    //   },
    // });

    // var mailOptions = {
    //   from: process.env.ADMIN,
    //   to: email,
    //   subject: "Auto email  Message",
    //   text: `Hello ${username} , your ordered product has been delievered . If you have any complaints with our product you can complain or chat with admin from the website `,
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });

    response.status(200).json({ sucess: "issuccess", status: 200, updated });
  } catch (error) {
    console.log("error: ", error);
    response.status(500).json({ error: "something went wrong" });
  }
};

module.exports = { placeOrder, myOrders, cancelOrder, allOrder, updateOrder };
