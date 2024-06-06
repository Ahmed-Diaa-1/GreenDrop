const express = require("express");
const router = express.Router();
const {
  viewLocations,
  addLocation,
  getLocation,
  editLocation,
  deleteLocation,
  getAssignedLocations,
} = require("../controllers/location.controller");

router.get("/view", viewLocations);
router.post("/add", addLocation);
router.get("/:id", getLocation);
router.put("/edit/:id", editLocation);
router.delete("/delete/:id", deleteLocation);
router.get("/driver/assigned", getAssignedLocations);
module.exports = router;
