const knex = require("../database/databaseConexao");

const cadastrarProdutos = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
    return res.status(404).json({
      msg: "necessario informar todos os dados",
    });
  }
  if (quantidade_estoque <= 0) {
    return res.status(404).json({
      msg: "Quantidade para adicionar inválida",
    });
  }
  if (valor <= 0) {
    return res.status(404).json({
      msg: "valor de produto inválido",
    });
  }
  try {
    const buscarCategoria = await knex("categorias")
      .where("id", categoria_id)
      .first();
    if (!buscarCategoria) {
      return res.status(404).json({
        msg: "Essa categoria não existe",
      });
    }
    const cadastrarProduto = await knex("produtos")
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .returning(["descricao", "quantidade_estoque", "valor", "categoria_id"]);
    return res.status(200).json(cadastrarProduto[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const editarProdutos = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
    return res.status(404).json({
      msg: "necessario informar todos os dados",
    });
  }
  if (quantidade_estoque <= 0) {
    return res.status(404).json({
      msg: "Quantidade para adicionar inválida",
    });
  }
  if (valor <= 0) {
    return res.status(404).json({
      msg: "valor de produto inválido",
    });
  }

  try {
    const buscarProduto = await knex("produtos").where({ id }).first();
    if (!buscarProduto) {
      return res.status(404).json({
        msg: "Produto não encontrado",
      });
    }
    const atualizarProduto = await knex("produtos")
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .where({ id })
      .returning(["descricao", "quantidade_estoque", "valor", "categoria_id"]);
    return res.json(atualizarProduto[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  cadastrarProdutos,
  editarProdutos,
};
