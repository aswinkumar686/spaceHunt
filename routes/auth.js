const router = require("express").Router();
const User = require("../Models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//Register

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_KEY
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    res.end()

  } catch (err) {
    res.status(500).json(err);
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong credentials");
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_KEY
    );
    const originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    originalpassword !== req.body.password &&
      res.status(401).json("Wrong credentials");
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(201).json({data:{...others, accessToken,expiresIn:4773358},success:true,message:"Successfully logged in"});
  } catch (err) {
    res.status(500).json({success:false,message:"Login failed"});
  }
});

module.exports = router;
