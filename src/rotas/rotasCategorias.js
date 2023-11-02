rotasCategorias = require("express").Router();

const { buscarCategoria } = require("../controlador/controladorCategorias");

rotasCategorias.get("/", buscarCategoria);

module.exports = rotasCategorias;
