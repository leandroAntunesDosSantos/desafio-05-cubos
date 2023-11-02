const joi = require("joi");

//
const clienteSchema = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatorio",
    "string.empty": "O campo nome é obrigatorio",
  }),
  email: joi.string().email().required().messages({
    "any.required": "O campo email é obrigatorio",
    "string.empty": "O campo email é obrigatorio",
    "string.email": "O campo email precisa ter um email valido",
  }),
  cpf: joi.string().required().messages({
    "any.required": "O campo cpf é obrigatorio",
    "string.empty": "O campo cpf é obrigatorio",
  }),
});

module.exports = clienteSchema;
