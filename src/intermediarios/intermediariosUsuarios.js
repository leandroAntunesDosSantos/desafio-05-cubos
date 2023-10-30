//
const validarRequisicao = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return req.status(400).json({ mensagem: error.massage });
  }
};

module.exports = validarRequisicao;
