var db = require("../../config/dbconfig");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

// const transporter = require("../../server");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., "Gmail", "Outlook", etc.
  auth: {
    type: "OAuth2",
    user: secrets.gmail,
    clientId: secrets.clientid,
    clientSecret: secrets.clientSecret,
    refreshToken: secrets.refresh_token,
    accessToken: secrets.access_token,
  },
});
exports.register = (req, res) => {
  const { name, email, password, type } = req.body;
  const q = "SELECT * FROM user WHERE email = ?";

  db.query(q, [email], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (data.length) {
      return res.status(400).json("Email is already registered");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // type = 0 = Customer, 1 = Driver and 2 = Admin
    const registerQ =
      "INSERT INTO user (`name`, `email`, `password`, `type`) VALUES (?, ?, ?, ?)";
    db.query(registerQ, [name, email, hash, type], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      const mailOptions = {
        from: "greendrop000@gmail.com",
        to: email,
        subject: "Registration Successful",
        text: `Hello ${name}, your registration was successful!`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });

      return res.status(200).json("User has been created");
    });
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
      return res.status(400).json({ error: "Invalid Email or Password" });
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

exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit code
  const expirationTime = Math.floor(Date.now() / 1000) + 20 * 60; // Code expires in 20 minutes (current time in seconds + 20 min)

  const updateQ =
    "UPDATE user SET resetCode = ?, resetCodeExp = ? WHERE email = ?";
  db.query(updateQ, [verificationCode, expirationTime, email], (err, data) => {
    if (err) return res.status(500).json(err);

    const mailOptions = {
      from: "greendrop000@gmail.com",
      to: email,
      subject: "Password Reset Verification Code",
      text: `Your password reset code is: ${verificationCode}. This code will expire in 20 minutes.`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Password reset code sent to email");
    });
  });
};

exports.resendVerification = (req, res) => {
  const { email } = req.body;

  // Check if the current code is expired
  const checkQ = "SELECT resetCodeExp FROM user WHERE email = ?";
  db.query(checkQ, [email], (err, data) => {
    if (err) return res.status(500).json(err);

    // If the verification code is expired or doesn't exist, generate a new one
    if (!data.length || data[0].resetCodeExp <= Math.floor(Date.now() / 1000)) {
      const newVerificationCode = Math.floor(100000 + Math.random() * 900000);
      const newExpirationTime = Math.floor(Date.now() / 1000) + 20 * 60; // 20 minutes from now

      const updateQ =
        "UPDATE user SET resetCode = ?, resetCodeExp = ? WHERE email = ?";
      db.query(
        updateQ,
        [newVerificationCode, newExpirationTime, email],
        (err, data) => {
          if (err) return res.status(500).json(err);

          const mailOptions = {
            from: "greendrop000@gmail.com",
            to: email,
            subject: "Your New Password Reset Verification Code",
            text: `Your new password reset code is: ${newVerificationCode}. This code will expire in 20 minutes.`,
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) return res.status(500).json(err);
            return res
              .status(200)
              .json("New password reset code sent to email");
          });
        }
      );
    } else {
      // If the current code is still valid, inform the user
      return res
        .status(200)
        .json(
          "A verification code has already been sent. Please check your email or wait for the code to expire before requesting a new one."
        );
    }
  });
};

exports.resetPassword = (req, res) => {
  const { email, verificationCode, newPassword } = req.body;
  const q =
    "SELECT * FROM user WHERE email = ? AND resetCode = ? AND resetCodeExp > ?";
  db.query(
    q,
    [email, verificationCode, Math.floor(Date.now() / 1000)], //convert to seconds
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (!data.length)
        return res.status(400).json("Invalid or expired verification code");

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(newPassword, salt);

      const updateQ =
        "UPDATE user SET password = ?, resetCode = NULL, resetCodeExp = NULL WHERE email = ?";
      db.query(updateQ, [hash, email], (err, data) => {
        if (err) return res.status(500).json(err);
        const mailOptions = {
          from: "greendrop000@gmail.com",
          to: email,
          subject: "Your Password Has Been Changed",
          text:
            "This is a confirmation that the password for your account " +
            email +
            " has just been changed.",
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("Password has been reset Successfully");
        });
      });
    }
  );
};
