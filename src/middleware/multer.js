const multer = require('multer');

// Configure storage settings
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure this directory exists or adjust the path
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Save the file with its original name
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Export the upload object directly
module.exports = upload;
