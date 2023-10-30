const rotasSwagger = require('express').Router()

const swaggerUi = require('swagger-ui-express')

const swaggerDocument = require("../swagger.json");


rotasSwagger.use("/", swaggerUi.serve);
rotasSwagger.get("/", swaggerUi.setup(swaggerDocument));


module.exports = rotasSwagger;