const multer = require("multer");
const path = require("path");

const fileUploadPaths = {
  FILE_UPLOAD_PATH: path.join(__dirname, "..", "public"),
  CART_IMAGE_UPLOAD_PATH: path.join(__dirname, "..", "public", "card_images"),
  POST_FILE_UPLOAD_PATH: path.join(__dirname, "..", "public", "post_files"),
  CART_IMAGE_URL: "/static/card_images",
  POST_FILE_URL: "/static/post_files",

  USER_IMAGE_UPLOAD_PATH: path.join(__dirname, "..", "public", "user_profile"),
  USER_IMAGE_URL: "/static/user_profile",
};

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const postFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image") || file.mimetype.startsWith("video")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}; 

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fileUploadPaths.FILE_UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.toLowerCase().replace(/ /g, "_"));
  },
});

let uploadImage = multer({
  storage: storage,
  fileFilter: imageFilter,
});

let uploadPost = multer({
  storage: storage,
  fileFilter: postFilter,

});

module.exports = { uploadImage, uploadPost, fileUploadPaths };
