const filtroLogin = require("../intermediarios/intermediariosAutenticacao");

const rotasProdutos = require("express").Router();

const {
  cadastrarProdutos,
  editarProdutos,
  listarProdutos,
  detalharProduto,
  excluirProduto,
} = require("../controlador/controladorProdutos");

const validarRequisicao = require("../intermediarios/intermediariosUsuarios");
const produtoSchema = require("../validacoes/produtoSchema");

rotasProdutos.use(filtroLogin);

rotasProdutos.post("/", validarRequisicao(produtoSchema), cadastrarProdutos);

rotasProdutos.put("/:id", validarRequisicao(produtoSchema), editarProdutos);

rotasProdutos.get("/", listarProdutos);

rotasProdutos.get("/:id", detalharProduto);

rotasProdutos.delete("/:id", excluirProduto);

module.exports = rotasProdutos;
