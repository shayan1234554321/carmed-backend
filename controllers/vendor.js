const Validations = require("../validations");
const Vendor = require("../services/vendor");
const s3 = require("../services/aws");
const fs = require('fs');

const uploadFileToS3 = async (file) => {
  try {
    const imagePath = file.path;

    const blob = fs.readFileSync(imagePath);

    const uploadedImage = await s3.upload({
      Bucket: process.env.BUCKET_NAME,
      Key: file.filename,
      Body: blob,
    }).promise();

    return uploadedImage;
  } catch (error) {
    return null;
  }
}

const createVendor = async (req, res, next) => {

  const uploadedImage = await uploadFileToS3(req.file);

  try {
    const request = {
      profile : uploadedImage?.Location || "",
      name : req.body.name,
      contact : req.body.contact,
      email : req.body.email,
      password : req.body.password,
      cnic : req.body.cnic,
      skill : req.body.skill,
      gender : req.body.gender,
      city : req.body.city,
      latLng : {
        lat: req.body.lat,
        lng: req.body.lng
      },
    }
    
    const data = await Validations.vendor.vendorCreation(
      request,
    );

    const response = await Vendor.createVendor(data);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const loginVendor = async (req, res, next) => {
  try {
    const data = await Validations.vendor.vendorLogin(
      req.body,
    );

    const response = await Vendor.loginVendor(data);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const acceptOrder = async (req, res, next) => {
  try {

    const response = await Vendor.acceptOrder(req.body);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const completeOrder = async (req, res, next) => {
  try {

    const response = await Vendor.completeOrder(req.body);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const cancelOrder = async (req, res, next) => {
  try {

    const response = await Vendor.cancelOrder(req.body);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const placeBid = async (req, res, next) => {
  try {

    const response = await Vendor.placeBid(req.body);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createVendor,
  loginVendor,
  acceptOrder,
  completeOrder,
  cancelOrder,
  placeBid
}