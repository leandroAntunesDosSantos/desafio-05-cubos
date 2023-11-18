const joi = require("joi");

const pedidoSchema = joi.object({
  cliente_id: joi.number().required().messages({
    "any.required": "O campo cliente_id é obrigatorio",
    "number.min": "O valor deve ser maior que 0",
  }),
  observacao: joi.string().required().messages({
    "any.required": "O campo observação é obrigatorio",
    "string.empty": "O campo observação é obrigatorio",
  }),
  pedido_produtos: joi.number().integer().min(1).required().messages({
    "any.required": "O campo valor é obrigatorio",
    "number.min": "O valor deve ser maior que 0",
  }),
});

module.exports = pedidoSchema;

