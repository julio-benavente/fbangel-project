const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookie = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cookie());
app.use(cors());

// Routes
const users = require("./routes/api/users");
const adminUsers = require("./routes/api/adminUsers");
const payments = require("./routes/api/payments");
const auth = require("./routes/auth/auth");
const email = require("./routes/email");

app.use("/api/users", users);
app.use("/api/adminUsers", adminUsers);
app.use("/api/payments", payments);
app.use("/auth", auth);
app.use("/email", email);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Database connection
const db = process.env.ATLAS_MONGO_DB;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((e) => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

// App connection
app.listen(port, () => {
  console.log("Server running... ");
});
