const express = require("express");
const filtroLogin = require("../intermediarios/intermediariosAutenticacao");
const { login } = require("../controlador/controladorAutenticacao");

const {
  buscarCategoria,
  buscarUsuarios,
  cadastrarUsuario,
  atualizarPerfilUsuarioLogado,
  obterPerfilUsuarioLogado,
} = require("../controlador/controladorUsuarios");

const router = express();

router.get("/categorias", buscarCategoria);

router.get("/usuarios", buscarUsuarios);

router.post("/usuario", cadastrarUsuario);

router.post("/login", login);

router.use(filtroLogin);

router.get("/perfil", obterPerfilUsuarioLogado);

router.put("/usuario", atualizarPerfilUsuarioLogado);


module.exports = router;


