var db = require("../../config/dbconfig");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.register = (req, res) => {
  let password = req.body.password;
  const name = req.body.name;
  const email = req.body.email;
  const q = "select * from user where email= ?";
  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(400).json("Email is already registered");
  });

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  password = hash;
  // type = 0 = Customer, 1 = Driver and 2 = Admin
  const registerQ =
    "insert into user (`name`,`email`,`password`) values(?,?,?)";
  db.query(registerQ, [name, email, password], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("User has been created");
  });
};

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const q = "SELECT * FROM user where `email`=?";
  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!data.length)
      return res.status(400).json({ error: "Invalid Email or Password" });

    const checkPass = bcrypt.compareSync(password, data[0].password);
    if (!checkPass) {
      return res.status(400).json({ error: "Wrong Password" });
    }

    const token = jwt.sign(
      {
        id: data[0].id,
        name: data[0].name,
        profile: data[0].profile,
        email: data[0].email,
        type: data[0].type,
      },
      "secretKey"
    );

    return res
      .status(200)
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 240000),
      })
      .json({ success: true, message: "Login successful" });
  });
};
