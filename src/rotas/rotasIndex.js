const rotasSwagger = require("./rotasSwagger");

const rotasAutenticacao = require("./rotasAutenticacao");

const rotasUsuarios = require("./rotasUsuarios");
const rotasCategorias = require("./rotasCategorias");
const rotasProdutos = require("./rotasProdutos");

const rotas = require("express").Router();

rotas.use("/usuario", rotasUsuarios);
rotas.use("/login", rotasAutenticacao);
rotas.use("/categoria", rotasCategorias);
rotas.use("/produto", rotasProdutos);

rotas.use("/doc", rotasSwagger);
module.exports = rotas;
