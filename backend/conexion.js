const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://RubenUrrego:vAtiHLIewW5NqxZj@cluster0.n9ewtyq.mongodb.net/hackathon?retryWrites=true&w=majority')
//ofline mongodb://127.0.0.1:27017/hackathon
const objetodb = mongoose.connection

objetodb.on('connected',() => {console.log("Conexión correcta a MongoDB")})
objetodb.on('error',() => {console.log("Error en la conexión a mongodb")})

module.exports = mongoose