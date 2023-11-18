
const filtroLogin = require("../intermediarios/intermediariosAutenticacao");


const rotasPedidos = require("express").Router();


const { cadastrarPedido, listarPedidos } = require("../controlador/controladorPedidos");


// const validarRequisicao = require("../intermediarios/intermediariosUsuarios");

// const pedidoSchema = require("../validacoes/pedidoSchema");


rotasPedidos.use(filtroLogin);

rotasPedidos.post('/', cadastrarPedido)
rotasPedidos.get('/', listarPedidos)

module.exports = rotasPedidos