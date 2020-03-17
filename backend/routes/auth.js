const router = require("express").Router();
const auth = require("../auth-token.js");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");

router.route("/").get(auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.route("/signin").post(
  [
    check("email", "please enter valid email").isEmail(),
    check("password", "password is required").exists()
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
        }
        const payload = {
          user: {
            id: user.id
          }
        };

        jwt.sign(
          payload,
          process.env.jwt,
          { expiresIn: 36000000 },
          (err, token) => {
            if (err) console.log(err);
            res.json({ token });
          }
        );
      }
    } catch (err) {
      console.error(err.message);
      res.status(500);
    }
  }
);

module.exports = router;
