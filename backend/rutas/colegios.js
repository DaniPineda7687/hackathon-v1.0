const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const esquema = mongoose.Schema

const esquemaColegio = new esquema({
    nombre:String,
    direc:String,
    cuposTotales:Number,
    cuposDisponibles:Number,
    geometry:Array,
})

const modeloColegios = mongoose.model('colegios',esquemaColegio)
module.exports = router

router.get('/colegiosTotales', async (req,res) => {
  let colegios = await modeloColegios.find();
  colegios ? res.send(colegios) : res.send("error");
}
)

router.post('/actualizarCuposDisp',async (req,res)=>{
  let colegio = await modeloColegios.updateOne({_id:req.body.id},{cuposDisponibles:req.body.cuposDisponibles});
  res.send(`Cupos del colegio cambiados a ${req.body.cuposDisponibles}`);
})
