const prisma = require("../database/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { firebaseConstants } = require("../static/constants");
const { db } = require("./firebase");

const createUser = async (user = {}) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  const createdUser = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hashedPassword,
      cnic: user.cnic,
      gender: user.gender,
      profile: user.profile
    },
  });

  const token = jwt.sign({ _id: createdUser._id }, process.env.TOKEN_SECRET);

  return {
    ...createdUser,
    type: "user",
    token,
  };
};

const loginUser = async (user = {}) => {
  const emailExist = await prisma.user.findFirst({
    where: { email: user.email },
  });

  if (!emailExist) return null;
  const validPass = await bcrypt.compare(user.password, emailExist?.password);

  if (!validPass) return null;

  const token = jwt.sign({ _id: emailExist._id }, process.env.TOKEN_SECRET);

  return {
    ...emailExist,
    type: "user",
    token,
  };
};

const createOrder = async (order) => {
  const createdOrder = await prisma.order.create({
    data: {
      problem: order.problem,
      bid: order.bid,
      carType: order.carType,
      location: order.location,
      userId: order.userId,
      userName: order.userName,
      requests: order.requests,
      status: "pending",
      vendorName: "null",
      vendorId: "null",
      latLng: order.latLng,
      rating: 0,
      review: "",
      userProfile: order.userProfile,
      vendorProfile: "",
      time: order.time || '',
      date: order.date || ''
    },
  });

  const dbOrder = await db.collection(firebaseConstants.orders).add({
    bid: createdOrder.bid,
    requests: createdOrder.requests,
    problem: createdOrder.problem,
    carType: createdOrder.carType,
    location: createdOrder.location,
    userId: createdOrder.userId,
    userName: createdOrder.userName,
    status: createdOrder.status,
    vendorId: createdOrder.vendorId,
    vendorName: createdOrder.vendorName,
    rating: createdOrder.rating,
    review: createdOrder.review,
    userProfile: createdOrder.userProfile,
    vendorProfile: createdOrder.vendorProfile,
    latLng: createdOrder.latLng,
    date: createdOrder.date,
    time: createdOrder.time
  });

  return dbOrder.id;
};

const updateOrder = async (order) => {
  const dbOrder = await db
    .collection(firebaseConstants.orders)
    .doc(order.id)
    .update({
      bid: order.bid,
      carType: order.carType,
      location: order.location,
      problem: order.problem,
    });

  return dbOrder.id;
};

const cancelOrder = async (order) => {
  const dbOrder = await db
    .collection(firebaseConstants.orders)
    .doc(order.id)
    .update({
      status: "canceled",
    });

  return dbOrder.id;
};

const acceptRequest = async (order) => {
  const dbOrder = await db
    .collection(firebaseConstants.orders)
    .doc(order.id)
    .update({
      status: "process",
      vendorId: order.vendorId,
      vendorName: order.vendorName,
      vendorProfile: order.vendorProfile,
      bid: order.bid,
    });

  return dbOrder.id;
};

const giveRating = async (order) => {
  const vendor = await prisma.vendor.findFirst({
    where: { id: order.vendorId },
  });

  const updatedVendor = await prisma.vendor.update({
    where: { id: order.vendorId },
    data: {
      ratings: [
        ...vendor.ratings,
        { rating: order.rating, review: order.review ? order.review : "" },
      ],
    },
  });

  db.collection(firebaseConstants.orders)
    .doc(order.id)
    .update({
      rating: order.rating,
      review: order.review ? order.review : "",
    });

  return updatedVendor.id;
};

module.exports = {
  createUser,
  loginUser,
  createOrder,
  cancelOrder,
  acceptRequest,
  giveRating,
  updateOrder,
};
