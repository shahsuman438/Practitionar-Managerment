const path = require("path");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (cb) => {
    cb(null, "uploads/users/");
  },
  filename: (file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: (file, callback) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      callback(null, true);
    } else {
      console.log("only jpg/png supported");
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

module.exports = upload;
