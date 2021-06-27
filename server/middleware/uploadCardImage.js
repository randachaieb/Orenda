const multer = require("multer");
const path = require("path");

const fileUploadPaths = {
  FILE_UPLOAD_PATH: path.join(__dirname, "..", "public"),
  CART_IMAGE_UPLOAD_PATH: path.join(__dirname, "..", "public", "card_images"),
  CART_IMAGE_URL: "/static/card_images",
};

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
console.log(fileUploadPaths);

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fileUploadPaths.FILE_UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.toLowerCase().replace(/ /g, "_"));
  },
});

let uploadCardImage = multer({
  storage: storage,
  fileFilter: multerFilter,
});

module.exports = { uploadCardImage, fileUploadPaths };
