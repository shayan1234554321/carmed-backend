const prisma = require("../database/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { firebaseConstants } = require("../static/constants");
const { db } = require("./firebase");

const createVendor = async (vendor = {}) => {
  const existingUser = await prisma.vendor.findFirst({
    where: {
      email: vendor.email,
    },
  });

  if (existingUser) return { error: "user already exist" };

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(vendor.password, salt);

  const createdvendor = await prisma.vendor.create({
    data: {
      name: vendor.name,
      email: vendor.email,
      password: hashedPassword,
      cnic: vendor.cnic,
      gender: vendor.gender,
      contact: vendor.contact,
      skill: vendor.skill,
      profile: vendor.profile,
      city: vendor.city,
      ratings: [],
      latLng: vendor.latLng,
    },
  });

  const token = jwt.sign({ _id: createdvendor._id }, process.env.TOKEN_SECRET);

  return {
    ...createdvendor,
    type: "vendor",
    token,
  };
};

const loginVendor = async (vendor = {}) => {
  const emailExist = await prisma.vendor.findFirst({
    where: { email: vendor.email },
  });

  if (!emailExist) return null;

  const validPass = await bcrypt.compare(vendor.password, emailExist?.password);

  if (!validPass) return null;

  const token = jwt.sign({ _id: emailExist._id }, process.env.TOKEN_SECRET);

  return {
    ...emailExist,
    type: "vendor",
    token,
  };
};

const acceptOrder = async (data) => {
  const dbOrder = await db
    .collection(firebaseConstants.orders)
    .doc(data.id)
    .update({
      status: "process",
      vendorId: data.vendorId,
      vendorName: data.vendorName,
    });

  return dbOrder.id;
};

const completeOrder = async (data) => {
  const dbOrder = await db
    .collection(firebaseConstants.orders)
    .doc(data.id)
    .update({
      status: "completed",
    });

  return dbOrder.id;
};

const cancelOrder = async (data) => {
  const dbOrder = await db
    .collection(firebaseConstants.orders)
    .doc(data.id)
    .update({
      status: "canceled",
    });

  return dbOrder.id;
};

const placeBid = async (data) => {
  const vendor = await prisma.vendor.findFirst({
    where: { id: data.request.vendorId },
  });

  const docRef = db.collection(firebaseConstants.orders).doc(data.id);
  const docData = await docRef.get();

  if (docData.exists) {
    let requests = docData.data().requests;
    requests = requests.filter(
      (request) => request.vendorId !== data.request.vendorId
    );
    requests.push({ ...data.request, ratings: vendor.ratings });
    await docRef.update({ requests });
    return docData.id;
  } else {
    return null;
  }
};

module.exports = {
  createVendor,
  loginVendor,
  acceptOrder,
  completeOrder,
  cancelOrder,
  placeBid,
};
