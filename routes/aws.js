const awsRouter = require('express').Router();
const awsController = require('../controllers/aws');

const router = () => {
    awsRouter.route('/get-signed-url').put(awsController.getSignedUrl);
    return awsRouter;
};

module.exports = router;