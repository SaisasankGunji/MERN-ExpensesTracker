const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/User");

const isAuth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "saisasankKey");

      // Fetch user and attach it to request object
      req.user = await User.findById(decoded.id).select("-password");

      // If token is about to expire, refresh it
      const expiresIn = decoded.exp * 1000 - Date.now();
      if (expiresIn < 5 * 60 * 1000) {
        const newToken = jwt.sign({ id: decoded.id }, "saisasankKey", {
          expiresIn: "30d",
        });
        res.setHeader("Authorization", `Bearer ${newToken}`);
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = isAuth;
