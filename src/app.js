require("dotenv").config();
const express = require("express");
const router = require("./rotas/rotasIndex.js");
const cors = require("cors");

const {
  atualizarPerfilUsuario,
  buscarUsuarios,
  buscarCategoria,
  cadastrarUsuario,
} = require("./rotas/rotasUsuarios.js");
// const validarRequisicao = require("./intermediarios/intermediariosUsuarios.js");
// const usuarioSchema = require("./validacoes/usuario.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.get("/categorias", buscarCategoria);

app.get("/usuarios", buscarUsuarios);

app.post("/usuario", cadastrarUsuario);

// validarRequisicao(usuarioSchema)

app.put("/usuario/:id", atualizarPerfilUsuario);

module.exports = app;
