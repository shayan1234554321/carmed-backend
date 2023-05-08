const Joi = require("joi");

const { parseJoiError } = require("../utils/common");

const schemas = {
  orderCreation: (data) => {
    const Validation = Joi.object().keys({
      destination: Joi.string().required().messages({
        "any.required": "destination is required",
      }),
      origin: Joi.string().required().messages({
        "any.required": "origin is required",
      }),
      user_price: Joi.string().required().messages({
        "any.required": "user_price is required",
      })
    });

    return parseJoiError(Validation.validate(data));
  }
};

module.exports = schemas;