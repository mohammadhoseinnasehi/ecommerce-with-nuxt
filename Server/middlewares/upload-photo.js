const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  // reject file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// const limits = { fileSize: 1024 * 1024 * 5 };

var upload = multer({
  storage: storage,
  // limits: limits,
  fileFilter: fileFilter,
});
module.exports = upload;
