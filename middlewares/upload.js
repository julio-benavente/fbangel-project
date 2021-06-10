const multer = require("multer");
const { v4 } = require("uuid");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, v4() + "_" + file.originalname);
  },
});

var uploadMulter = multer({ storage: storage });
var uploadMultiple = uploadMulter.fields([
  { name: "fbEmailImage", maxCount: 1 },
  { name: "bmIdImage", maxCount: 1 },
  { name: "documentImage", maxCount: 1 },
]);

module.exports = { upload: uploadMultiple };
