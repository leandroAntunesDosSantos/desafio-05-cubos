const rotasUsuarios = require("express").Router();

const filtroLogin = require("../intermediarios/intermediariosAutenticacao");
const validarRequisicao = require("../intermediarios/intermediariosUsuarios");

const {
  cadastrarUsuario,
  obterPerfilUsuario,
  atualizarUsuario,
} = require("../controlador/controladorUsuarios");

const usuarioSchema = require("../validacoes/usuarioSchema");

rotasUsuarios.post("/", validarRequisicao(usuarioSchema), cadastrarUsuario);

rotasUsuarios.use(filtroLogin);

rotasUsuarios.get("/", obterPerfilUsuario);

rotasUsuarios.put("/", validarRequisicao(usuarioSchema), atualizarUsuario);

module.exports = rotasUsuarios;
