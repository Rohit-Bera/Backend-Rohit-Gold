const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

//logic of CRUD ( contorllers)
const {
  signin,
  signup,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controllers/user.controller");

router.post("/signup", signup);

router.post("/signin", signin);

router.put("/updateuser/:id", updateUser);

router.get("/getalluser", getUser);
router.get("/getUserById/:id", getUserById);

router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
