const s3 = require("../services/aws");
const { getRandomKey } = require("../services/common");

const getSignedUrl = async (req, res, next) => {
  try {
    let imageName = getRandomKey();
    if(req.body.name && req.body.type){
      imageName = `${imageName}` + req.body.name;
    }

    const params = ({
      Bucket: process.env.BUCKET_NAME,
      Key: imageName,
      Expires: 180,
      ContentType: req.body.type
    })

    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);

    res.status(200).json(uploadUrl);
  } catch (error) {
    next(error);
  }
};



module.exports = {
  getSignedUrl
}