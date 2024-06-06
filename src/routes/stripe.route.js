const express = require("express");
const router = express.Router();
const { charge } = require("../controllers/stripe.controller");

router.post("/charge", charge);

module.exports = router;
