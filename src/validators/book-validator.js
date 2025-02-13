const Joi = require("joi");

const bookSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    author: Joi.string().min(3).max(50).optional()
});

module.exports = { bookSchema };
