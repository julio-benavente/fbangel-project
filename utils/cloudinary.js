require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageAndGetUrl = async (image, upload_preset) => {
  try {
    var { url } = await cloudinary.uploader.upload(image, {
      upload_preset,
    });
    return url;
  } catch (error) {
    return "";
  }
};

module.exports = { cloudinary, uploadImageAndGetUrl };
