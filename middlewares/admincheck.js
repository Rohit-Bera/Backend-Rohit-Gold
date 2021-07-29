const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { request } = require("express");

const admincheck = async (request, response, next) => {
  const token = request.header("Authorization").replace("Bearer ", "");
  //console.log("token auth: ", token);

  const decoded = jwt.verify(token, "newuser");
  //console.log("decoded: ", decoded);

  const user = await User.findOne({ _id: decoded._id });

  console.log("user = ", user);
  if (user.userType !== "admin") {
    return response.status(401).json({ error: "only admin can made changes" });
  }

  next();
};

module.exports = admincheck;
