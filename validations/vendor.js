const Joi = require("joi");

const { parseJoiError } = require("../utils/common");

const schemas = {
  vendorCreation: (data) => {
    const Validation = Joi.object().keys({
      email: Joi.string().required().messages({
        "any.required": "email is required",
      }),
      name: Joi.string().required().messages({
        "any.required": "name is required",
      }),
      password: Joi.string().required().messages({
        "any.required": "password is required",
      }),
      gender: Joi.string().required().messages({
        "any.required": "gender is required",
      }),
      cnic: Joi.string().required().messages({
        "any.required": "cnic is required",
      }),
      contact: Joi.string().required().messages({
        "any.required": "contact is required",
      }),
      skill: Joi.string().required().messages({
        "any.required": "skill is required",
      }),
      profile: Joi.string().required().messages({
        "any.required": "profile is required",
      }),
      city: Joi.string().required().messages({
        "any.required": "City is required",
      }),
      latLng: Joi.object().required().messages({
        "any.required": "Lat Lng is required",
      }),
    });

    return parseJoiError(Validation.validate(data));
  },

  vendorLogin: (data) => {
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