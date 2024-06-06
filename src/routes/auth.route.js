const express = require("express");
const router = express.Router();
const {
  login,
  register,
  forgotPassword,
  resetPassword,
  resendVerification,
} = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/forgot", forgotPassword);
router.get("/reset", resetPassword);
router.get("/resend", resendVerification);

module.exports = router;
