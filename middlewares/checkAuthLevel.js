const AdminUser = require("../models/AdminUser");

const checkAuthLevel = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await AdminUser.findOne({ email: email });

    if (user) {
      req.userAuthLevel = "admin";
    } else {
      req.userAuthLevel = "user";
    }
    next();
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

module.exports = checkAuthLevel;
