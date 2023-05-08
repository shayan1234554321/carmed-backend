const Joi = require("joi");

const { parseJoiError } = require("../utils/common");

const schemas = {
  userCreation: (data) => {
    const Validation = Joi.object().keys({
      email: Joi.string().required().messages({
        "any.required": "Email is required",
      }),
      name: Joi.string().required().messages({
        "any.required": "Name is required",
      }),
      password: Joi.string().required().messages({
        "any.required": "Password is required",
      }),
      gender: Joi.string().required().messages({
        "any.required": "Gender is required",
      }),
      cnic: Joi.string().required().messages({
        "any.required": "Cnic is required",
      }),
      profile: Joi.string().allow("").messages({
        "any.required": "Profile is required",
      }),
    });

    return parseJoiError(Validation.validate(data));
  },

  userLogin: (data) => {
    const Validation = Joi.object().keys({
      email: Joi.string().required().messages({
        "any.required": "email is required",
      }),
      password: Joi.string().required().messages({
        "any.required": "password is required",
      }),
    });

    return parseJoiError(Validation.validate(data));
  }
};

module.exports = schemas;