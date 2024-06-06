const db = require("../../config/dbconfig");
const jwt = require("jsonwebtoken");

exports.viewFeedback = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("user not logged in");
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    const q = "select * from feedback where DriverID = ?";
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

exports.addFeedback = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("user not logged in");
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    const q =
      "insert into feedback (`UID`,`customerName`,`rating`,`comment`,`DriverID`) values(?,?,?,?,?) ";
    const values = [
      userInfo.id,
      userInfo.name,
      req.body.rating,
      req.body.comment,
      req.params.id,
    ];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Feedback added successfully");
    });
  });
};

exports.editFeedback = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("user not logged in");
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    const q =
      "update feedback set `rating`=?,`comment`=? where id=? and uid=? ";
    // let values = [req.body.rating, req.body.comment, req.params.id];
    // if (userInfo.type !== "admin")
    let values = [
      req.body.rating,
      req.body.comment,
      req.params.id,
      userInfo.id,
    ];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      else {
        console.log(data);
        return res.status(200).json("Feedback updated successfully");
      }
    });
  });
};
exports.deleteFeedback = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("user not logged in");
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    const q = "delete from feedback where id = ? and UID=?";
    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Feedback deleted successfully");
    });
  });
};
