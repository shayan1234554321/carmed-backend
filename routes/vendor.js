const vendorRouter = require('express').Router();
const vendorController = require('../controllers/vendor');

const router = () => {
    vendorRouter.route('/').post(vendorController.createVendor);
    vendorRouter.route('/login').put(vendorController.loginVendor);
    vendorRouter.route('/accept-order').post(vendorController.acceptOrder);
    vendorRouter.route('/complete-order').post(vendorController.completeOrder);
    vendorRouter.route('/cancel-order').post(vendorController.cancelOrder);
    vendorRouter.route('/place-bid').post(vendorController.placeBid);
    return vendorRouter;
};

module.exports = router;