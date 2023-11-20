const knex = require('../database/databaseConexao')

const cadastrarPedido = async (req,res)=>{
    const {cliente_id, observacao, pedido_produtos} = req.body

    
    try {

        if(pedido_produtos.length < 1 ){
        return res.status(400).json({ mensagem: "Nenhum produto foi informado no pedido!" });
        }

        const buscarCliente = await knex('clientes').where('id', cliente_id).first();

        if(!buscarCliente){
            return res.status(400).json({ mensagem: "Cliente não encontrado!" });
        }

        let valorTotalAPagar = 0;

        for (let i = 0; i < pedido_produtos.length; i++) {
          const idProduto = pedido_produtos[i].produto_id
          const quantidadeProduto = pedido_produtos[i].quantidade_produto

          const verificarExisteProduto = await knex('produtos').where('id', idProduto).first();
        
          if(!verificarExisteProduto){
            return res.status(400).json({ mensagem: "Produto de Id: " + idProduto + " não encontrado" });
          }
          if(quantidadeProduto > verificarExisteProduto.quantidade_estoque){
            return res.status(400).json({ mensagem: "Estoque insuficiente para o produto de Id: " + idProduto });
          }

          const valorPorProduto = quantidadeProduto * verificarExisteProduto.valor

          valorTotalAPagar += valorPorProduto
        }

        const tabelaPedidos = await knex('pedidos').insert({
          client_id: cliente_id, 
          observacao,
          valor_total: valorTotalAPagar
         }).returning(["id"])

        for (let i = 0; i < pedido_produtos.length; i++) {
          const idProdutoCompra = pedido_produtos[i].produto_id
          const quantidadeProdutoCompra = pedido_produtos[i].quantidade_produto

          const buscarProduto = await knex('produtos').where('id', idProdutoCompra).first()

          const estoqueFinal = buscarProduto.quantidade_estoque - quantidadeProdutoCompra

          const valorPorProduto = quantidadeProdutoCompra * buscarProduto.valor
   
          const tabelaProdutos = await knex('produtos')
          .where('id', idProdutoCompra)
          .update({
            quantidade_estoque: estoqueFinal
          }).returning(["id"])

          await knex('pedido_produtos').insert({
            pedido_id: tabelaPedidos[0].id,
            produto_id: tabelaProdutos[0].id,
            quantidade_produto: quantidadeProdutoCompra,
            valor_produto: valorPorProduto
           })     
        }
         return res.status(201).json({msg: "Pedido cadastrado com sucesso!"})
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}


const listarPedidos = async (req,res)=>{
  const {cliente_id} = req.query
  
    try {
      if(!cliente_id){
        const listarTodosPedidos = await knex('pedidos') 
        return res.status(200).json(listarTodosPedidos)
      }
      
      const listarTodosPedidos = await knex('pedidos') 
      
      const filtrarPedidos = listarTodosPedidos.filter((item)=>{
        return item.client_id === Number(cliente_id)
      })

      const arrayPedidos = []

      for (let i = 0; i < filtrarPedidos.length; i++) {
        const pedido = filtrarPedidos[i]
        const filtroId = filtrarPedidos[i].id

        const pedido_produtos = await knex('pedido_produtos').where('pedido_id', filtroId)
        const extrato = [{pedido,pedido_produtos,}];
        arrayPedidos.push(extrato)
      }

      return res.status(200).json(arrayPedidos)
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = {
    cadastrarPedido,
    listarPedidos
}