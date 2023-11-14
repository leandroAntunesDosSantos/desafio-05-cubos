const knex = require("../database/databaseConexao");

const cadastrarClientes = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
  try {
    const buscarEmail = await knex("clientes").where({ email }).first();
    if (buscarEmail) {
      return res.status(400).json({
        mensagem: "Este email ja esta cadastrado",
      });
    }
    const buscarCpf = await knex("clientes").where({ cpf }).first();
    if (buscarCpf) {
      return res.status(400).json({
        mensagem: "Este cpf ja esta cadastrado",
      });
    }
    const cadastroDoCliente = await knex("clientes")
      .insert({
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado
      })
      .returning(["nome", "email", "cpf","cep","rua","numero","bairro","cidade","estado"]);
    return res.status(201).json(cadastroDoCliente[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const editarCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
  try {
    const buscarCliente = await knex("clientes").where({ id }).first();
    if (!buscarCliente) {
      return res.status(400).json({
        mensagem: "Cliente não encontrado",
      });
    }
  
    const buscarEmail = await knex("clientes").where({ email }).first();
    
    if (buscarEmail) {
      if(buscarEmail.email !== buscarCliente.email){
        return res.status(400).json({
          mensagem: "Email ja esta cadastrado",
        });
      }
    }
    
    const buscarCpf = await knex("clientes").where({ cpf }).first();

    if (buscarCpf) {
      if(buscarCpf.cpf !== buscarCliente.cpf){
        return res.status(400).json({
          mensagem: "Este cpf ja esta cadastrado",
        });
      } 
    }
    const alteracaoCadastro = await knex("clientes")
      .where({ id })
      .update({
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado
      })
      .returning(["nome", "email", "cpf","cep","rua","numero","bairro","cidade","estado"]);
    return res.status(201).json(alteracaoCadastro[0]);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listarClientes = async (req, res) => {
  try {
    const buscaClientes = await knex("clientes");
    return res.status(200).json(buscaClientes);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const selecionarCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const buscarCliente = await knex("clientes").where({ id }).first();
    if (!buscarCliente) {
      return res.status(400).json({
        mensagem: "Cliente não encontrado",
      });
    }
    return res.status(200).json(buscarCliente);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  cadastrarClientes,
  editarCliente,
  listarClientes,
  selecionarCliente,
};
