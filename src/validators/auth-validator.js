const Joi = require("joi");

const signupSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    password: Joi.string().min(6).max(30).required(),
});

const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
});

module.exports = { signupSchema, signinSchema };
