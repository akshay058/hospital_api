const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const Doctor = require("../models/doctor");

const Authenticate = asyncHandler(async (req, res, next) => {
  var token;
  //   console.log("Token", req.headers.authorization);

  if (req.headers.authorization) {
    try {
      // Get token from header
      token = req.headers.authorization;

      // System.out.println("Token", req.headers.authorization);

      // Verify token.....
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded value", decoded);
      // Get user from the token
      req.user = decoded;
      //   console.log("user ", req.user);
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = {
  Authenticate,
};
