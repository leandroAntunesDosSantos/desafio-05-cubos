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
    const usuarioEncontrado = await knex("usuarios").where({ email }).first();
    if (usuarioEncontrado) {
      return res.status(404).json({ msg: "Este email ja esta cadastrado." });
    }
    const senhaCriptografada = await bcript.hash(senha, 10);

    const cadastroDeUsuario = await knex("usuarios")
      .insert({
        nome,
        email,
        senha: senhaCriptografada,
      })
      .returning(["id", "nome", "email"]);
    return res.status(201).json(cadastroDeUsuario[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const obterPerfilUsuarioLogado = async (req, res) => {
  return res.status(200).json(req.usuario);
};

const atualizarPerfilUsuarioLogado = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.usuario;

  if (!nome && !email && !senha) {
    return res
      .status(404)
      .json("É obrigatório informar ao menos um campo para atualização");
  }

  try {
    const usuarioExiste = await knex("usuarios").where({ id }).first();

    if (!usuarioExiste) {
      return res.status(404).json({
        mensagem: "Usuario não encontrado",
      });
    }
    const senhaCriptografada = await bcript.hash(senha, 10);

    if (email !== req.usuario.email) {
      const emailUsuarioExiste = await knex("usuarios")
        .where({ email })
        .first();

      if (emailUsuarioExiste) {
        return res.status(404).json({ mensagem: "O Email já existe." });
      }
    }
    await knex("usuarios").where({ id }).update({
      nome,
      email,
      senha: senhaCriptografada,
    });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  buscarCategoria,
  buscarUsuarios,
  cadastrarUsuario,
  obterPerfilUsuarioLogado,
  atualizarPerfilUsuarioLogado,
};
