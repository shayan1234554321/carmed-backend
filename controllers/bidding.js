const Validations = require("../validations");
// const Bidding = require("../services/bidding");

const postAnOrder = async (req, res, next) => {
    try {
      const data = await Validations.bidding.orderCreation(
        req.body,
      );
      
  
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

module.exports = {
    postAnOrder
}