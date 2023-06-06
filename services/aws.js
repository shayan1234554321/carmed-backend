const AWS = require('aws-sdk')

const s3 = new AWS.S3({
  accessKeyId: process.env.ACESSS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
  region: "us-west-2"
})

module.exports = s3;