const db = require("../../config/dbconfig");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.charge = (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: 2000,
      currency: "usd",
      description: "charge for shit",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
};
