// const knex = require('../database/databaseConexao')

// const cadastrarPedido = async (req,res)=>{
//     const {cliente_id, observacao, pedido_produtos} = req.body
    
//     try {
//         const buscarCliente = await knex('clientes').where('id', cliente_id).first();
//         if(!buscarCliente){
//             return res.status(400).json({ mensagem: "Cliente não encontrado" });
//         }
//         const buscarProdutos = await knex('produtos')

        
//         const produtoDisponivel = []
//         const IDprodutodisponivel = []

//         for (let i = 0; i < pedido_produtos.length; i++) {
//             for (let j = 0; j < buscarProdutos.length; j++) {
//                 if(pedido_produtos[i].produto_id === buscarProdutos[j].id){
//                     produtoDisponivel.push(buscarProdutos[j])
//                     IDprodutodisponivel.push(pedido_produtos[i].produto_id)
//                 }
//                 if(pedido_produtos[i].quantidade_produto > produtoDisponivel[j].quantidade_estoque){
//                   return res.status(400).json({ mensagem: "Estoque insuficiente para alguns produtos" })
//               }    
//             }
            
//         }
//         const transacao = await knex('produtos')
//         .update({
//             quantidade_estoque: buscarProdutos.quantidade_estoque - pedido_produtos.quantidade_produto,
//         })
//         .where('id', [IDprodutodisponivel])

//         console.log(transacao)
//          return res.status(200).json(transacao)
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ mensagem: "Erro interno do servidor" });
//     }
// }

// const cadastrarPedido = async (req,res)=>{
//     const { cliente_id, observacao, pedido_produtos } = req.body;

//   try {
   
//     const clienteExiste = await knex("clientes").where({ id: cliente_id });
//     if (!clienteExiste) {
//       return res.status(404).json("O cliente informado não existe.");
//     }
//     let valorTotal = 0;
//     for (let i = 0; i < pedido_produtos.length; i++) {
//       let idProduto = pedido_produtos[i].produto_id;

//       const produtoExiste = await knex("produtos").where({
//         id: idProduto,
//       });

//       if (!produtoExiste) {
//         return res.status(404).json("O produto informado não existe.");
//       }

//       const quantidadeSolicitada = pedido_produtos[i].quantidade_produto;

//       const estoque = produtoExiste[0].quantidade_estoque;

//       if (estoque < quantidadeSolicitada) {
//         return res
//           .status(400)
//           .json(
//             "A quantidade de produtos requisitada não está disponível no estoque"
//           );
//       }

//       const precoProduto = produtoExiste[0].valor;
//       valorTotal += precoProduto * quantidadeSolicitada;
//     }
//     const pedido = await knex("pedidos")
//       .insert({
//         cliente_id,
//         observacao,
//         valor_total: valorTotal,
//       })
//       .returning("*");

//     for (let i = 0; i < pedido_produtos.length; i++) {
//       let idProduto = pedido_produtos[i].produto_id;
//       const produtoExiste = await knex("produtos").where({
//         id: idProduto,
//       });
//       const quantidadeSolicitada = pedido_produtos[i].quantidade_produto;
//       const precoProduto = produtoExiste[0].valor;
//       const estoqueAtualizado =
//         produtoExiste[0].quantidade_estoque - quantidadeSolicitada;

//       await knex("produtos")
//         .where({ id: idProduto })
//         .update({ quantidade_estoque: estoqueAtualizado });

//       await knex("pedido_produtos")
//         .insert({
//           pedido_id: pedido[0].id,
//           produto_id: idProduto,
//           quantidade_produto: quantidadeSolicitada,
//           valor_produto: precoProduto,
//         })
//         .returning("*");
//     }

//     return res.status(200).json(pedido);
//   } catch (error) {
//     res.status(error.statusCode || 500).json(error.message);
//   }

// }




// const listarPedidos = async (req,res)=>{
//     return res.json('tudo bem')
// }


// module.exports = {
//     cadastrarPedido,
//     listarPedidos
// }