const AdminUser = require("../models/AdminUser");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const tokenApi = process.env.JWT_KEY;
  const token = req.cookies.fbangelJWT;

  try {
    if (token) {
      jwt.verify(token, tokenApi, async (err, decodedToken) => {
        try {
          if (err) {
            throw Error("The user is not authenticated");
          }

          const user = await AdminUser.findById(decodedToken.data, {
            _id: 1,
            authLevel: 1,
          });

          if (!user || user.authLevel !== "admin") {
            throw Error("The user doesn't exist or have admin privileges");
          }
          next();
          return;
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      });
    } else {
      throw Error("The user is not authenticated");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = authMiddleware;
