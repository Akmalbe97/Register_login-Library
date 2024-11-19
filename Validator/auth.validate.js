const Joi = require("joi");

exports.authValidator = function (data) {
    const schema = Joi.object({
        username: Joi.string().required().messages({
            "string.empty": "Username is required",
        }),
        email: Joi.string().email().required().messages({
            "string.email": "Invalid email format",
            "string.empty": "Email is required",
        }),
        password: Joi.string().min(6).max(20).required().messages({
            "string.min": "Password must be at least 6 characters",
            "string.max": "Password cannot exceed 20 characters",
            "string.empty": "Password is required",
        }),
    });

    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
        return error.details.map((detail) => detail.message);
    }

    return null;
};
