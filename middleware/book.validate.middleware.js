const {
    bookValidator,
    } = require("../Validator/book.validate");
    
exports.bookValidate = function (req, res, next) {
        try {
            const { error } = bookValidator(req.body);
            if (error) {
                return res.status(400).json({msg: error.details[0].message });
            }
            next();
        } catch (error) {
            console.log(error.message);
        }
    }