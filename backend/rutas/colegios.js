const { response } = require('express')
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

const esquemaLoginColegios = new esquema({
  id: String,
  pass: String,
  nombre: String
})

const modeloLoginColegios = mongoose.model('loginColegios',esquemaLoginColegios)
const modeloColegios = mongoose.model('colegios',esquemaColegio)
module.exports = router

router.post('/LoginColegio', async(req,res)=>{
  let colegio = await modeloLoginColegios.find({id:req.body.id,pass:req.body.pass});
  colegio!=null ? res.send(colegio) : res.send("error");
})

router.post('/colegioInfo',async(req,res)=>{
  let colegio = await modeloColegios.find({nombre:req.body.nombre});
  colegio!=null ? res.send(colegio) : res.send("error");
})
router.get('/colegiosTotales', async (req,res) => {
  let colegios = await modeloColegios.find();
  colegios ? res.send(colegios) : res.send("error");
}
)

router.post('/actualizarCuposDisp',async (req,res)=>{
  let colegio = await modeloColegios.updateOne({_id:req.body.id},{cuposDisponibles:req.body.cuposDisponibles});
  res.send(`Cupos del colegio cambiados a ${req.body.cuposDisponibles}`);
})
