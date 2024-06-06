const db = require("../../config/dbconfig");
const jwt = require("jsonwebtoken");

exports.viewUsers = (req, res) => {
  const q = "select id,type,name,email from user";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
exports.editUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("user not logged in");
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    const q = "update user set `name`=?,`profile`=? where id=?";
    db.query(q, [req.body.name, req.body.profile, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Updated Successfully!!");
    });
  });
};

exports.viewProfile = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("user not logged in");
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");
    const q = "select id,name,email,profile from user where id=?";
    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data[0]);
    });
  });
};
