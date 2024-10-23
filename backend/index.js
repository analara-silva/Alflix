const express = require('express')
const mysql = require('mysql2/promise')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const conn = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'alflix'
})

app.listen(3000)

app.get('/filmes', async (req, res) => {
    const filme = req.query.filme

    const filmeProcurado = `%${filme}%`

    const dadosbanco = await conn.query("select * from filmes where titulo like ?", [filmeProcurado])
    res.json(dadosbanco[0])
})

app.post('/login', (req, res) =>{
    let usuario = req.body.usuario
    let senha = req.body.senha

    console.log(usuario)
    console.log(senha)

    res.send('ok')
})

