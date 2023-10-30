const rotasSwagger = require('./rotasSwagger')

const rotas = require('express').Router()


rotas.use("/doc", rotasSwagger)

module.exports = rotas