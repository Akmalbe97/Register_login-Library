const Joi = require("joi");

exports.bookValidator = function (data) {
    const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        rate: Joi.number().required(),
        page: Joi.number().min(10).max(800).required(),
        publish: Joi.string().required(),
        genre: Joi.string().required(),
        publishHome: Joi.string().required(),
        description: Joi.string(),
        author_info: Joi.required(),
        era: Joi.string().required(),
    });

    const { error } = schema.validate(data);
    if (error) {
        return { error: error.details[0].message };
    }

    return { error: null };
};