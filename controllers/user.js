const Validations = require("../validations");
const User = require("../services/user");

const createUser = async (req, res, next) => {
  const user = {
    email : req.body.email,
    name : req.body.name,
    password : req.body.password,
    gender : req.body.gender,
    cnic : req.body.cnic,
    profile : req.body.profile || ""
  }
  try {
    const data = await Validations.user.userCreation(
      user,
    );

    const response = await User.createUser(data);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const data = await Validations.user.userLogin(
      req.body,
    );

    const response = await User.loginUser(data);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const data = req.body

    const response = User.createOrder(data)

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const data = req.body

    const response = User.updateOrder(data)

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const cancelOrder = async (req, res, next) => {
  try {
    const data = req.body

    const response = User.cancelOrder(data)

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const acceptRequest = async (req, res, next) => {
  try {
    const data = req.body

    const response = User.acceptRequest(data)

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const giveRating = async (req, res, next) => {
  try {
    const data = req.body

    const response = User.giveRating(data)

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};



module.exports = {
  createUser,
  loginUser,
  createOrder,
  cancelOrder,
  acceptRequest,
  giveRating,
  updateOrder
}