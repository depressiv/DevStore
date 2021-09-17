import db from './db.js'
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json())

app.get('/produto', async(req, resp) => {
    try {
        let r = await db.tb_produto.findAll({order: [['id_produto', 'desc' ]] })
        resp.send(r)
    } catch(e) {{ erro: resp.send( e.toString() ) }}
})

app.post('/produto', async(req, resp) => {
    try {
        let {nomeProduto, categoria, precoDe, precoPor, avaliacao, descricao, quantidadeEstoque, imagemProduto} = req.body;
 
        if(nomeProduto == '' || nomeProduto == null || categoria == '' || categoria == null || precoDe == '' || precoDe == null || precoPor == '' || precoPor == null || avaliacao == '' || avaliacao == null || descricao == '' || descricao == null || quantidadeEstoque == '' || quantidadeEstoque == null || imagemProduto == '' || imagemProduto == null)
           return resp.send({erro: "Um ou mais campos não estão preenchidos"})

        if(isNaN(avaliacao) || isNaN(precoDe) || isNaN(precoPor) || isNaN(quantidadeEstoque)) 
            return resp.send({erro: "avaliacao, preco de, preco por e Estoque precisam ser números"})

        if (avaliacao < 0 || precoDe < 0 || precoPor < 0 || quantidadeEstoque < 0)
            return resp.send({erro: "avaliacao, preco de, preco por e Estoque precisam ser números positivos"})

        let u = await db.tb_produto.findOne({where: {nm_produto: nomeProduto}}) 
        if (u != null) 
            return resp.send( {erro: "Produto já cadastrado"})

        let r = await db.tb_produto.create({nm_produto: nomeProduto, ds_categoria: categoria, vl_preco_de: precoDe, vl_preco_por: precoPor, vl_avaliacao: avaliacao, ds_produto: descricao, qtd_estoque:quantidadeEstoque, img_produto: imagemProduto, bt_ativo: true, dt_inclusao: new Date()})
        resp.send(r);
    } catch (e) { {erro: resp.send(e.toString())}}
})

app.put('/produto/:id', async(req,resp) => {
    try {
        let {nomeProduto, categoria, precoDe, precoPor, avaliacao, descricao, quantidadeEstoque, imagemProduto} = req.body;
        
        if(nomeProduto == '' || nomeProduto == null || categoria == '' || categoria == null || precoDe == '' || precoDe == null || precoPor == '' || precoPor == null || avaliacao == '' || avaliacao == null || descricao == '' || descricao == null || quantidadeEstoque == '' || quantidadeEstoque == null || imagemProduto == '' || imagemProduto == null)
            return resp.send({erro: "Um ou mais campos não estão preenchidos"})

        if(isNaN(avaliacao) || isNaN(precoDe) || isNaN(precoPor) || isNaN(quantidadeEstoque)) 
            return resp.send({erro: "avaliacao, preco de, preco por e Estoque precisam ser números"})

        if (avaliacao < 0 || precoDe < 0 || precoPor < 0 || quantidadeEstoque < 0)
            return resp.send({erro: "avaliacao, preco de, preco por e Estoque precisam ser números positivos"})
    
        let u = await db.tb_produto.findOne({where: {nm_produto: nomeProduto}}) 
        if (u != null) {
            if(req.params.id != u.id_produto) {
                return resp.send( {erro: "Produto já cadastrado"})
            }
        }
            
        let r = await db.tb_produto.update({nm_produto: nomeProduto, ds_categoria: categoria, vl_preco_de: precoDe, vl_preco_por: precoPor, vl_avaliacao: avaliacao, ds_produto: descricao, qtd_estoque:quantidadeEstoque, img_produto: imagemProduto, bt_ativo: true}, {where: {id_produto: req.params.id}})
        resp.sendStatus(200)
    } catch(e) {{erro: resp.send(e.toString())}}
})

app.delete('/produto/:id', async(req, resp) => {
    try{
        let r = await db.tb_produto.destroy({where: {id_produto: req.params.id } })
        resp.sendStatus(200)
    } catch(e) {{erro: resp.send(e.tostring() )}}
})

app.listen(process.env.PORT,
    () => console.log(`subiu molin ${process.env.PORT}`))