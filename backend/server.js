const express = require('express')
const app = express()
const cors = require('cors')

const archivoBD = require('./conexion')

const rutacolegios = require('./rutas/colegios')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:'true'}))

app.use('/colegiosApi/colegios',rutacolegios)

app.get('/',(req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send('Bienvenidos al servidor backend sde Nodejs')
})

app.listen(5000,()=>{
    console.log("El servidor esta corriendo correctamente")
})