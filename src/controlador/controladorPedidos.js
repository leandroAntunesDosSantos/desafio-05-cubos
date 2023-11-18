const knex = require('../database/databaseConexao')

const cadastrarPedido = async (req,res)=>{
    const {cliente_id, observacao, pedido_produtos} = req.body
    
    try {
        const buscarCliente = await knex('clientes').where('id', cliente_id).first();
        if(!buscarCliente){
            return res.status(400).json({ mensagem: "Cliente não encontrado" });
        }

        for (let i = 0; i < pedido_produtos.length; i++) {
          let idProduto = pedido_produtos[i].produto_id
          let quantidadeProduto = pedido_produtos[i].quantidade_produto

          let verificarExisteProduto = await knex('produtos').where('id', idProduto).first();
        
          if(!verificarExisteProduto){
            return res.status(400).json({ mensagem: "Produto de Id: " + idProduto + " não encontrado" });
          }
          if(quantidadeProduto > verificarExisteProduto.quantidade_estoque){
            return res.status(400).json({ mensagem: "Estoque insuficiente para o produto de Id: " + idProduto });
          }
        }

        let valorTotalAPagar = 0

        let totalDeItens = 0



        for (let i = 0; i < pedido_produtos.length; i++) {
          const idProdutoCompra = pedido_produtos[i].produto_id
          const quantidadeProdutoCompra = pedido_produtos[i].quantidade_produto

          let buscarProduto = await knex('produtos').where('id', idProdutoCompra).first()

          let estoqueFinal = buscarProduto.quantidade_estoque - quantidadeProdutoCompra
          
          valorTotalAPagar += quantidadeProdutoCompra * buscarProduto.valor

          totalDeItens = quantidadeProdutoCompra

          const tabelaPedidos = await knex('pedidos').insert({
            client_id: cliente_id, 
            observacao,
            valor_total: valorTotalAPagar
           }).returning(["id","client_id","observacao","valor_total"])
          

          const tabelaProdutos = await knex('produtos')
          .where('id', idProdutoCompra)
          .update({
            quantidade_estoque: estoqueFinal
          }).returning(["id","descricao"])

          const pedidoProduto = await knex('pedido_produtos').insert({
            pedido_id: tabelaPedidos[0].id,
            produto_id: tabelaProdutos[0].id,
            quantidade_produto: totalDeItens,
            valor_produto: valorTotalAPagar
           })
           
        }
        


         return res.status(201).json({msg: "Produto cadastrado"})
    } catch (error) {
        console.log(error)
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
      
      const pedidos = await knex('pedidos').where('client_id', cliente_id);


      const historicoCompras = []

      for (let i = 0; i < pedidos.length; i++) {
        const pedido = pedidos[i]
        const valorPedido = pedidos[i].id
        const pedido_produtos = await knex('pedido_produtos').where("pedido_id", valorPedido);

        const extrato = [{pedido,},[pedido_produtos,]];

        historicoCompras.push(extrato)  
       
      }

      return res.status(200).json(historicoCompras)


    } catch (error) {
    
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}


module.exports = {
    cadastrarPedido,
    listarPedidos
}