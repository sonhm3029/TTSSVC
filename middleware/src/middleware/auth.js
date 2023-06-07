const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleWare = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      throw new Error(
        JSON.stringify({
          code: 403,
          message: "Missing credentials",
        })
      );
    }
    token = token.replace("Bearer ", "");
    console.log(token);

    jwt.verify(token, process.env.SECRET_JWT, async function (err, decoded) {
      if (err) {
        res.json({
          status: "ERROR",
          code: 403,
          message: "Invalid Credentials",
        });
      } else {
        let user = decoded?.compareRes;
        let existUser = await User.findOne({ username: user?.username });
        let isValidCredentials =
          existUser && user?.password && existUser?.password === user?.password;
        if (isValidCredentials) {
          res.locals.username = decoded?.compareRes?.username;
          next();
        } else {
          res.json({
            status: "ERROR",
            code: 403,
            message: "Invalid Credentials",
          });
        }
      }
    });
  } catch (error) {
    error = JSON.parse(error?.message);
    res.json({
      status: "ERROR",
      code: error?.code || 400,
      message: error?.message || "Smt wrong has occured!",
    });
  }
};

module.exports = authMiddleWare;
