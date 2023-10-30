const joi = require("joi");

//
const usuarioSchema = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatorio",
    "string.empty": "O campo nome é obrigatorio",
  }),
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

module.exports = usuarioSchema;
