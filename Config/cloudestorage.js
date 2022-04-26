const dotenv = require("dotenv");
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_format: ['jpg', 'png'],
    // files are gonna be uploaded to a folder called "myFolder" inside of cloudinary
    folder: 'myFolder'
  }
})

module.exports = multer({ storage })