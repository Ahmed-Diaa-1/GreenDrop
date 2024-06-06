const express = require("express");
const router = express.Router();
const {
  viewFeedback,
  addFeedback,
  deleteFeedback,
  editFeedback,
} = require("../controllers/feedback.controller");

router.get("/view/:id", viewFeedback);
router.post("/add/:id", addFeedback);
router.delete("/delete/:id", deleteFeedback);
router.put("/update/:id", editFeedback);
module.exports = router;
