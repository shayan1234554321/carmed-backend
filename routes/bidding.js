const biddingRouter = require('express').Router();
const authController = require('../controllers/auth');
const biddingController = require('../controllers/bidding');

const router = () => {
    // biddingRouter.route('/example-protected').get(authController.validate, biddingController.postAnOrder);
    biddingRouter.route('/').post(biddingController.postAnOrder);
    return biddingRouter;
};

module.exports = router;