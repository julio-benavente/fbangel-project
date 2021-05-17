const express = require("express");
const router = express.Router();
const AdminUser = require("../../models/AdminUser");
const auth = require("../../middlewares/auth");

const handleError = (error) => {
  const errorMessage = {};

  if (error.code && error.code === 11000) {
    errorMessage.email = "The email has already been registered";
  }

  return errorMessage;
};

// @route GET api/adminUsers
// @desc Get all the admin users
// @access Resticted
router.get("/", async (req, res) => {
  try {
    const users = await AdminUser.find({});
    res.json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @route POST api/adminUsers/registration
// @desc Register a new admin user
// @access Public
//##########################
// Make this route Restricted so just Admins can create another Admin user
router.post("/registration", async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUserAdmin = await new AdminUser({
      email,
      password,
    }).save();

    res.json({ message: "Admin user successfully created" });
  } catch (e) {
    const error = handleError(e);
    res.status(400).json({ error: error });
  }
});

module.exports = router;
