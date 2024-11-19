const Joi = require("joi");

exports.authorValidator = (data) => {
  const schema = Joi.object({
    first_name: Joi.string().min(2).max(20).required().messages({
      "string.empty": "First name is required",
      "string.min": "First name must be at least 2 characters",
      "string.max": "First name must not exceed 20 characters",
    }),
    last_name: Joi.string().min(3).max(15).required().messages({
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 3 characters",
      "string.max": "Last name must not exceed 15 characters",
    }),
    date_of_birth: Joi.string().length(4).required().messages({
      "string.empty": "Day of birth is required",
      "string.length": "Day of birth must be exactly 4 characters",
    }),
    date_of_death: Joi.string().length(4).optional().messages({
      "string.length": "Day of death must be exactly 4 characters",
    }),
    country: Joi.string().required().messages({
      "string.empty": "Country is required",
    }),
    bio: Joi.string().min(5).max(100).required().messages({
      "string.empty": "Bio is required",
      "string.min": "Bio must be at least 5 characters",
      "string.max": "Bio must not exceed 100 characters",
    }),
    works: Joi.string().min(3).required().messages({
     "string.empty": "works is required"
    }),
  });

  return schema.validate(data, { abortEarly: false });
};
