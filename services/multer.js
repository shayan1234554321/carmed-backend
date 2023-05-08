const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        const absolutePath = path.join(__dirname, '../images')
        cb(null, absolutePath);   
    },
    filename: (req,file,cb) => {
        cb(null,req.body.profile);
    },
});
const upload = multer({ storage : storage});
module.exports = upload