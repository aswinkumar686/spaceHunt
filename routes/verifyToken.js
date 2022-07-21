const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) res.status(403).json("Token is not valid");
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not aunthenticated");
  }
};
const verifyTokenAndAutherization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do");
    }
  });
};
const verifyTokenAndAdmin = (req, res, next) => {
  console.log('verify')
  verifyToken(req, res, () => {
    console.log(req.user.isAdmin)
    if (req.user.isAdmin) {
      
      next();
    } else {
      res.status(403).json("You are not allowed to do");
    }
  });
};


module.exports = { verifyTokenAndAutherization, verifyTokenAndAdmin };
