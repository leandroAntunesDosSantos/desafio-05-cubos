const joi = require("joi");

const pedidoSchema = joi.object({
  cliente_id: joi.number().required().messages({
    "any.required": "O campo cliente_id é obrigatorio",
    "number.min": "O valor deve ser maior que 0",
  }),
  observacao: joi.string(),
  pedido_produtos: joi.required().messages({
    "any.required": "O campo pedido_produtos é obrigatorio",
  }),
});

module.exports = pedidoSchema;

