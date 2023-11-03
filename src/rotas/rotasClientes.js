const filtroLogin = require("../intermediarios/intermediariosAutenticacao");

const rotasClientes = require("express").Router();

const {
  cadastrarClientes,
  editarCliente,
  listarClientes,
  selecionarCliente,
} = require("../controlador/controladorClientes");

const validarRequisicao = require("../intermediarios/intermediariosUsuarios");
const clienteSchema = require("../validacoes/clienteSchema");

rotasClientes.use(filtroLogin);

rotasClientes.post("/", validarRequisicao(clienteSchema), cadastrarClientes);

rotasClientes.put("/:id", validarRequisicao(clienteSchema), editarCliente);

rotasClientes.get("/", listarClientes);

rotasClientes.get("/:id", selecionarCliente);

module.exports = rotasClientes;
