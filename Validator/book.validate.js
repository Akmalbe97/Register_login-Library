const Joi = require("joi")



exports.bookValidator = function (data) {
    try{
        const schema = Joi.object({
            
          title: Joi.string().required(),
          author: Joi.string().required(),
          rate: Joi.number().required(),
          page: Joi.number().min(12).max(800).required(), 
          publish: Joi.string().min(30).required(),
          genre: Joi.string().required(),
          publishHome: Joi.string().required(),
          description: Joi.string().min(100),
          author_info: Joi.required(),
          era: Joi.string().required(),


        })

    }catch (error) {
        res.json(details[0].message)

    }
}