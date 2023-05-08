const userRouter = require('express').Router();
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const upload = require("../services/multer")

const router = () => {
    userRouter.route('/').post(upload.single('image') ,userController.createUser);
    userRouter.route('/addWithoutProfile').post(userController.createUser);
    userRouter.route('/login').put(userController.loginUser);
    userRouter.route('/order').post(userController.createOrder);
    userRouter.route('/updateOrder').post(userController.updateOrder);
    userRouter.route('/cancel-order').post(userController.cancelOrder);
    userRouter.route('/accept-request').post(userController.acceptRequest);
    userRouter.route('/give-rating').post(userController.giveRating);
    return userRouter;
};

module.exports = router;