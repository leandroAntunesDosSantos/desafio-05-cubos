const filtroLogin = require("../intermediarios/intermediariosAutenticacao");

const rotasProdutos = require("express").Router();

const {
  cadastrarProdutos,
  editarProdutos,
} = require("../controlador/controladorProdutos");

rotasProdutos.use(filtroLogin);

rotasProdutos.post("/", cadastrarProdutos);

rotasProdutos.put("/:id", editarProdutos);

module.exports = rotasProdutos;
