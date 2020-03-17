const router = require("express").Router();
let User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");

router.route("/signup").post(
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "please enter valid email").isEmail(),
    check(
      "password",
      "please enter password with 6 or more character"
    ).isLength({ min: 6 })
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ email });

      if (user) {
        res
          .status(400)
          .json({ errors: [{ msg: "user with this email already exists" }] });
      } else {
        const user = new User({
          name,
          email,
          password
        });

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        console.log(user);
        await user.save();

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
