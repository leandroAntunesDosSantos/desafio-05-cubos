const express = require("express");
const filtroLogin = require("../intermediarios/intermediariosAutenticacao");
const validarRequisicao = require("../intermediarios/intermediariosUsuarios");

const { login } = require("../controlador/controladorAutenticacao");
const { buscarCategoria } = require("../controlador/controladorCategorias");

const {
  cadastrarUsuario,
  atualizarPerfilUsuarioLogado,
  obterPerfilUsuarioLogado,
} = require("../controlador/controladorUsuarios");

const usuarioSchema = require("../validacoes/usuario");
const loginSchema = require("../validacoes/loginSchema");

const router = express();

router.get("/categoria", buscarCategoria);

router.post("/usuario", validarRequisicao(usuarioSchema), cadastrarUsuario);

router.post("/login", validarRequisicao(loginSchema), login);

router.use(filtroLogin);

router.get("/usuario", obterPerfilUsuarioLogado);

router.put(
  "/usuario",
  validarRequisicao(usuarioSchema),
  atualizarPerfilUsuarioLogado
);

module.exports = router;
