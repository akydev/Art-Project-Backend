const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ msg: "Unauthorized request" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decodedToken = jwt.verify(token, "secret");
    // console.log(decodedToken); To check encoded token { id: '67a0629119f4dd86de103668', iat: 1738566237, exp: 1738569837 }
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;
