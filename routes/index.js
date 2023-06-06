const express = require('express');
const indexRouter = express.Router();

const router = () => {
  const bidding = require('./bidding.js');
  const user = require('./user.js');
  const vendor = require('./vendor.js');
  const aws = require('./aws.js');
  
  indexRouter.use('/bidding', bidding());
  indexRouter.use('/user', user());
  indexRouter.use('/vendor', vendor());
  indexRouter.use('/aws', aws());

  return indexRouter;
};

module.exports = router;