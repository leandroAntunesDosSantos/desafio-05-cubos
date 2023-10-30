const bcript = require("bcrypt");

const knex = require("../database/databaseConexao");

const buscarCategoria = async (req, res) => {
  try {
    const usuarios = await knex("categorias");
    return res.json(usuarios);
  } catch (error) {
    return res.status(500).json(error.massage);
  }
};

const buscarUsuarios = async (req, res) => {
  try {
    const usuarios = await knex("usuarios");
    return res.json(usuarios);
  } catch (error) {
    return res.status(500).json(error.massage);
  }
};

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Preencha todos os campos obrigatórios" });
  }
  try {
    const emailExiste = await knex("usuarios").where("email", email);
    if (emailExiste.length > 0) {
      return res.status(404).json({ msg: "Este email ja esta cadastrado." });
    }
    const senhaCriptografada = await bcript.hash(senha, 10);

    const cadastroDeUsuario = await knex("usuarios")
      .insert({
        nome,
        email,
        senha: senhaCriptografada,
      })
      .returning(["nome", "email"]);
    return res.status(200).json(cadastroDeUsuario[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "ocorreu um erro" });
  }
};

const atualizarPerfilUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.params;
  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Preencha todos os campos obrigatórios" });
  }
  try {
    const emailExiste = await knex("usuarios").where("email", email);

    if (emailExiste.length > 0) {
      return res.status(404).json({ msg: "Este email ja esta cadastrado." });
    }

    const senhaCriptografada = await bcript.hash(senha, 10);

    const atualizarRegistro = await knex("usuarios")
      .update({
        nome,
        email,
        senha: senhaCriptografada,
      })
      .where("id", id)
      .returning(["nome", "email"]);

    return res.status(200).json(atualizarRegistro[0]);
  } catch (erro) {
    return res.status(500).json({ mensagem: "ocorreu um erro" });
  }
};

module.exports = {
  buscarCategoria,
  buscarUsuarios,
  cadastrarUsuario,
  atualizarPerfilUsuario,
};
