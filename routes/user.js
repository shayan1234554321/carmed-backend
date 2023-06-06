const userRouter = require('express').Router();
const userController = require('../controllers/user');

const router = () => {
    userRouter.route('/').post(userController.createUser);
    userRouter.route('/login').put(userController.loginUser);
    userRouter.route('/order').post(userController.createOrder);
    userRouter.route('/updateOrder').post(userController.updateOrder);
    userRouter.route('/cancel-order').post(userController.cancelOrder);
    userRouter.route('/accept-request').post(userController.acceptRequest);
    userRouter.route('/give-rating').post(userController.giveRating);
    return userRouter;
};

module.exports = router;