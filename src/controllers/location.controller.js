const db = require("../../config/dbconfig");
const jwt = require("jsonwebtoken");

exports.viewLocations = (req, res) => {
  const q = "select * from location";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Add a new Location to the database
exports.addLocation = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("user not logged in");
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");

    const q =
      "INSERT INTO location (`userID`, `driverID`, `latitude`, `longitude`) VALUES (?, ?, ?, ?)";
    const values = [
      userInfo.id,
      req.body.driverId,
      req.body.lat,
      req.body.long,
    ];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      req.io
        .to(`driver-${req.body.driverId}`)
        .emit("locationAssigned", { lat: req.body.lat, long: req.body.long });
      return res.status(200).json("Location added successfully");
    });
  });
};
// Get specific location information by ID
exports.getLocation = (req, res) => {
  const q = "select * from location where id=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};
// Update an existing location with new info
exports.editLocation = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("user not logged in");
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    const q = "update location set `latitude`=?,`longitude`=? where userId=?";
    const values = [req.body.lat, req.body.long, userInfo.id];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      req.io.emit("locationUpdated", {
        id: req.params.id,
        lat: req.body.lat,
        long: req.body.long,
      });
      return res.status(200).json("Location updated successfully");
    });
  });
};
// Delete a location from the database
exports.deleteLocation = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("user not logged in");
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    const q = "delete from location where id=? and userID=?";
    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Location deleted successfully");
    });
  });
};
exports.getAssignedLocations = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("user not logged in");
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    if (userInfo.type !== "driver")
      return res.status(403).json("Unauthorized access");

    const q = "SELECT * FROM location WHERE driverID=?";
    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
