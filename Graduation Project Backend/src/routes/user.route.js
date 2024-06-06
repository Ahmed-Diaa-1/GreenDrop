const express = require("express");
const router = express.Router();
const {
  viewUsers,
  editUser,
  viewProfile,
} = require("../controllers/user.controller");

router.get("/view", viewUsers);
router.put("/edit", editUser);
router.get("/viewProfile", viewProfile);
module.exports = router;
