const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

//hashing password
const hashPassword = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 8);
  return hashedPassword;
};

//generate token
const createToken = async (user) => {
  const token = await jwt.sign({ _id: user._id.toString() }, "newuser");
  return token;
};

//finding user..
const findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    return response.status(404).json({ error: "Invalid User.." });
  }

  const gotMatch = await bcrypt.compare(password, user.password);
  if (!gotMatch) {
    return response.status(404).json({ error: "Invalid User.." });
  }

  return user;
};

// user/admin signup
const signup = async (req, res) => {
  const { username, email, password, phone } = req.body;
  console.log("body : ", req.body);
  try {
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(404).json({ error: "user already exist. " });
    }
    const user = new User(req.body);
    const hashedPassword = await hashPassword(user);
    user.password = hashedPassword;

    //console.log("user.password: ", user.password);
    // send email when login
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rohit.glsica19@gmail.com",
        pass: "rohit#@1979",
      },
    });

    var mailOptions = {
      from: "rohit.glsica19@gmail.com",
      to: email,
      subject: "Auto email SignUp Message",
      text: `Hello ${username} , Regards from admin rohit . Thank You for Joining Rohit's Gold . Please continue your shopping `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    await user.save();
    const token = await createToken(user);

    console.log("token: ", token);

    user.password = undefined;

    // console.log("user.password: ", user.password); //

    res.status(201).json({ user, token });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "something went wrong!.." });
  }
};

// user-admin signin
const signin = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await findByCredentials(email, password);

    const token = await createToken(user);
    console.log("Signed-in user : ", user, "with token : ", token);
    user.password = undefined;
    response.status(200).json({ user, token });
  } catch (err) {
    response.status(500).json({ error: "something went wrong" });
  }
};

// getting all user..
const getUser = async (request, response) => {
  User.find((err, user) => {
    if (err) {
      return response.status(500).json({ error: "Data not found..." });
    }

    console.log("user : ", user);
    response.status(200).json(user);
  });
};

const getUserById = async (request, response) => {
  const _id = request.params.id;
  try {
    const userId = await User.findOne({ _id });

    if (!userId) {
      return response.json({
        status: 500,
        isFail: false,
        error: "Id not found",
      });
    }

    response.json({ status: 200, isSuccess: true, userId });
  } catch (e) {
    console.log("e: ", e);

    return response.json({
      status: 500,
      isFail: false,
      error: "Internal server error",
    });
  }
};

// updating user..
const updateUser = async (request, response) => {
  const _id = request.params.id;
  //console.log("_id: ", _id);

  const body = request.body;
  //console.log("body: ", body);

  try {
    const user = await User.findByIdAndUpdate(
      { _id },
      { $set: body },
      { new: true }
    );

    if (!user) {
      return response.status(500).json("User not found");
    }
    const token = await createToken(user);
    console.log("Signed-in user : ", user, "with token : ", token);
    user.password = undefined;
    response.status(200).json({ user, token });
    console.log("user: ", user);
  } catch (err) {
    console.log("error", err);

    response.status(500).json({ error: "something went wrong" });
  }
};

const deleteUser = async (request, response) => {
  const _id = request.params.id;

  try {
    const user = await User.findByIdAndDelete({ _id });

    if (!user) {
      return response.status(500).json({ error: "user not found" });
    }

    response.status(200).json("user has been deleted..");
    console.log("deleted user is : ", user);
  } catch (error) {
    console.log("error: ", error);
    response.status(500).json({ error: "something went wrong." });
  }
};

module.exports = {
  signin,
  signup,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
};
