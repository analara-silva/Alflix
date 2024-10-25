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

app.post('/login', async (req, res) =>{
    let usuario = req.body.usuario
    let senha = req.body.senha
    let status = false

    const sql = 
        `select * from usuarios
        where email = ? and senha = ?`

    const [rows] = await conn.execute(sql, [usuario, senha])
    if(rows.length > 0)
    {
        status = true
    }

    res.send('Usuário autenticado: '+status)
})

