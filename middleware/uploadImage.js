const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    cb(null,` ${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Faqat rasm qo'sha olasiz"), false);
  }
};

const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal fayl hajmi: 5 MB
});


module.exports = uploadImage