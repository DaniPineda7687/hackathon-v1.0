const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/hackathon')
//ofline mongodb://127.0.0.1:27017/hackathon
// online mongodb+srv://RubenUrrego:vAtiHLIewW5NqxZj@cluster0.n9ewtyq.mongodb.net/hackathon?retryWrites=true&w=majority
const objetodb = mongoose.connection

objetodb.on('connected',() => {console.log("Conexión correcta a MongoDB")})
objetodb.on('error',() => {console.log("Error en la conexión a mongodb")})

module.exports = mongoose