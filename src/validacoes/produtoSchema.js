const joi = require("joi");

const produtoSchema = joi.object({
  descricao: joi.string().required().messages({
    "any.required": "O campo descricão é obrigatorio",
    "string.empty": "O campo descricão é obrigatorio",
  }),
  quantidade_estoque: joi.number().min(1).integer().required().messages({
    "any.required": "O campo quantidade estoque é obrigatorio",
    "number.min": "A quantidade deve ser maior que 0",
  }),
  valor: joi.number().integer().min(1).required().messages({
    "any.required": "O campo valor é obrigatorio",
    "number.min": "O valor deve ser maior que 0",
  }),
  categoria_id: joi.number().min(1).integer().required().messages({
    "any.required": "O campo categoria é obrigatorio",
    "number.min": "O campo categoria deve ser maior que 0",
  }),
});

module.exports = produtoSchema;
