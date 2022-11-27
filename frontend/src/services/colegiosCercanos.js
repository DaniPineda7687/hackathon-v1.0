import { distanceBetween } from "./distanceBetween";
function verificarJornada(colegio,jornadasUsuario){
  let jornadasColegio = Object.keys(colegio.jornada);
  let marcador = false;
  jornadasUsuario.forEach(jornadaU =>{
    if(jornadasColegio.includes(jornadaU)){
      console.log("uno uno")
      marcador=true;
    }
  })
  return marcador ? marcador : false;
}

/*function verificarNivelEducativo(colegio,nivelUsuario,jornadasUsuario){
  console.log(jornadasUsuario)
  jornadasUsuario.forEach(jornadasU=>{
    console.log(jornadasU)
    let levels = Object.keys(colegio.jornada)
    console.log(levels)
  })
}*/
export const colegiosCerca = (userPosition,km,coles,otherConditions) => {
  //No hay condiciones del usuario
  if(!otherConditions){
    if(coles.length!==0){
      const colesCerca = coles.map(col => (distanceBetween(userPosition,col.geometry)<=(km*1000)-500) ? col : undefined ).filter(arry => arry!== undefined);
      return colesCerca;
    }else{
      return [/*se devuelve un array vacio para que el .map se pueda */]
    }
  }else{
  //Hay condiciones (nivel y horario)
  let level = otherConditions.educationLevel;
  console.log(otherConditions)
  let schedule = otherConditions.schedule;
    if(coles.length!==0){
      const colesCerca = coles.map(col => (distanceBetween(userPosition,col.geometry)<=(km*1000)-500) ? col : undefined ).filter(cole=>{
        if(cole!==undefined){
          console.log(cole);
          console.log(schedule);
          if(verificarJornada(cole,schedule)){
            //verificarNivelEducativo(cole,level,schedule)
            return cole;
          }
        }
      });
      return colesCerca;
    }else{
      return [/*se devuelve un array vacio para que el .map se pueda */]
    }
  }
}
