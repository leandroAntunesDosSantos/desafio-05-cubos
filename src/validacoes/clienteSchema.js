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
  cep: joi.string().required().messages({
    "any.required": "O campo cep é obrigatorio",
    "string.empty": "O campo cep é obrigatorio",
  }),
  rua: joi.string().required().messages({
    "any.required": "O campo rua é obrigatorio",
    "string.empty": "O campo rua é obrigatorio",
  }),
  numero: joi.number().integer().min(1).required().messages({
    "any.required": "O campo numero é obrigatorio",
    "number.min": "O valor deve ser maior que 0",
  }),
  bairro: joi.string().required().messages({
    "any.required": "O campo bairro é obrigatorio",
    "string.empty": "O campo bairro é obrigatorio",
  }),
  cidade: joi.string().required().messages({
    "any.required": "O campo cidade é obrigatorio",
    "string.empty": "O campo cidade é obrigatorio",
  }),
  estado: joi.string().required().messages({
    "any.required": "O campo estado é obrigatorio",
    "string.empty": "O campo estado é obrigatorio",
  }),
});

module.exports = clienteSchema;
