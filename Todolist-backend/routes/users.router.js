const express = require("express");
const userController = require("../controllers/users.controller");
const router = express.Router();


// setup user router

// get all user
router.get("", userController.getAll)
// get user by id
router.get("/:id",userController.getById)

// create user
router.post("", userController.createUsers)

// update user
router.put("/:id", userController.updateUsers)

// delete user
router.delete("/:id", userController.deleteUsers)


// gọi ra 
module.exports= router