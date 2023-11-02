const { login } = require("../controlador/controladorAutenticacao");
const validarRequisicao = require("../intermediarios/intermediariosUsuarios");
const loginSchema = require("../validacoes/loginSchema");

const rotasAutenticacao = require("express").Router();

rotasAutenticacao.post("/", validarRequisicao(loginSchema), login);

module.exports = rotasAutenticacao;
