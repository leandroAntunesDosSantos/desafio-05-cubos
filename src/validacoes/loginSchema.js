const joi = require("joi");

//
const loginSchema = joi.object({
  email: joi.string().email().required().messages({
    "any.required": "O campo email é obrigatorio",
    "string.empty": "O campo email é obrigatorio",
    "string.email": "O campo email precisa ter um email valido",
  }),
  senha: joi.string().required().messages({
    "any.required": "O campo senha é obrigatorio",
    "string.empty": "O campo senha é obrigatorio",
  }),
});

module.exports = loginSchema;
