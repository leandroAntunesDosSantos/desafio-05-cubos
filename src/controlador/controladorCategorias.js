const knex = require("../database/databaseConexao");

const buscarCategoria = async (req, res) => {
  try {
    const categoria = await knex("categorias");
    return res.json(categoria);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  buscarCategoria,
};
