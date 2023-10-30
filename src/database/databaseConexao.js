const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false,
  },
});

(async () => {
  try {
    await knex.raw("SELECT 1");
    console.log(`Conectado ao banco de dados ${process.env.DB_NAME}`);
  } catch (erro) {
    console.error("Erro ao conectar ao banco de dados:", erro);
  }
})();

(async () => {
  const existeTabelaUsuarios = await knex.schema.hasTable("usuarios");
  try {
    if (!existeTabelaUsuarios) {
      await knex.schema.createTable("usuarios", (table) => {
        table.increments("id").primary();
        table.string("nome", 255);
        table.string("email", 255).unique();
        table.string("senha", 255);
      });
    }

    const existeTabelaCategorias = await knex.schema.hasTable("categorias");
    if (!existeTabelaCategorias) {
      await knex.schema.createTable("categorias", (table) => {
        table.increments("id").primary();
        table.string("descricao", 255);
      });
    }
  } catch (error) {
    console.log("Erro ao conectar ao criar tabela banco de dados:", erro);
  }
})();

module.exports = knex;
