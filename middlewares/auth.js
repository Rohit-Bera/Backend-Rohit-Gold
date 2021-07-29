const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { request } = require("express");

//authentication of cookies || for login

const auth = async (request, response, next) => {
  //middleware function
  try {
    const token = request.header("Authorization").replace("Bearer ", "");
    console.log("token auth: ", token);

    const decoded = jwt.verify(token, "newuser");
    //console.log("decoded: ", decoded);

    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      response.status(401).json({
        error: "please authenticate",
      });
    }

    request.token = token;
    request.user = user;

    next();
  } catch (error) {
    console.log("error: ", error);
    response.status(500).json({
      error: "something went wrong auth",
    });
  }
};

module.exports = auth;
