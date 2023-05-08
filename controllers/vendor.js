const Validations = require("../validations");
const Vendor = require("../services/vendor");

const createVendor = async (req, res, next) => {
  try {
    const request = {
      profile : req.body.profile,
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