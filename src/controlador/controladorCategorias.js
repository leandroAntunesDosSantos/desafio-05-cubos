//
const knex = require("../database/databaseConexao");

const buscarCategoria = async (req, res) => {
  try {
    const usuarios = await knex("categorias");
    return res.json(usuarios);
  } catch (error) {
    return res.status(500).json(error.massage);
  }
};

module.exports = {
  buscarCategoria,
};
