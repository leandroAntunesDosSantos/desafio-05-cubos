const rotasSwagger = require("./rotasSwagger");

const rotasUsuarios = require("./rotasUsuarios");
const rotasAutenticacao = require("./rotasAutenticacao");
const rotasCategorias = require("./rotasCategorias");
const rotasProdutos = require("./rotasProdutos");
const rotasClientes = require("./rotasClientes");

const rotas = require("express").Router();

rotas.use("/usuario", rotasUsuarios);
rotas.use("/login", rotasAutenticacao);
rotas.use("/categoria", rotasCategorias);
rotas.use("/produto", rotasProdutos);
rotas.use("/cliente", rotasClientes);

rotas.use("/doc", rotasSwagger);
module.exports = rotas;
