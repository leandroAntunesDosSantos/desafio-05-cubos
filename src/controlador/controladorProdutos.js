const knex = require("../database/databaseConexao");

const cadastrarProdutos = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const buscarCategoria = await knex("categorias")
      .where("id", categoria_id)
      .first();
    if (!buscarCategoria) {
      return res.status(404).json({
        msg: "Essa categoria não foi encontrada",
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

  try {
    const buscarCategoria = await knex("categorias")
      .where("id", categoria_id)
      .first();
    if (!buscarCategoria) {
      return res.status(404).json({
        msg: "Essa categoria não foi encontrada",
      });
    }
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

const listarProdutos = async (req, res) => {
  const { categoria_id } = req.query;
  try {
    if (categoria_id) {
      const filtroProdutosID = await knex("produtos").where(
        "categoria_id",
        categoria_id
      );
      return res.status(200).json(filtroProdutosID);
    }
    const todosProdutos = await knex("produtos");
    return res.status(200).json(todosProdutos);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detalharProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const buscarProduto = await knex("produtos").where({ id }).first();
    if (!buscarProduto) {
      return res.status(400).json({ mensagem: "Produto não encontrado" });
    }
    return res.status(200).json(buscarProduto);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const excluirProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const buscarProduto = await knex("produtos").where({ id }).first();
    if (!buscarProduto) {
      return res.status(400).json({ mensagem: "Produto não encontrado" });
    }
    await knex("produtos").where({ id }).delete();
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
module.exports = {
  cadastrarProdutos,
  editarProdutos,
  listarProdutos,
  detalharProduto,
  excluirProduto,
};
