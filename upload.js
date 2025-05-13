const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

cloudinary.config({
  cloud_name: 'drpnqmquf',
  api_key: '414263188825946',
  api_secret: '4EUcbRlXFXB2EiL1KAMkvUx8a3A',
});

router.post('/upload', upload.single('image'), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (err, result) => {
    fs.unlinkSync(req.file.path); 
    if (err) return res.status(500).send('Upload error');
    res.json({ url: result.secure_url });
  });
});

module.exports = router;
