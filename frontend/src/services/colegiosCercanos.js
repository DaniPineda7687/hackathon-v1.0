import { distanceBetween } from "./distanceBetween";
function verificarCondicionesUsuario(colegio,jornadasUsuario,level){
  let jornadasColegio = Object.keys(colegio.jornada);
  let marcador = false;
  jornadasUsuario.forEach(jornadaU =>{
    if(jornadasColegio.includes(jornadaU) && colegio.jornada[jornadaU].escolaridad?.[level]){
      marcador=true;
    }
  })
  return marcador ? marcador : false;
}
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
  let schedule = otherConditions.schedule;
    if(coles.length!==0){
      const colesCerca = coles.map(col => (distanceBetween(userPosition,col.geometry)<=(km*1000)-500) ? col : undefined ).filter(cole=>{
        if(cole!==undefined){
          if(verificarCondicionesUsuario(cole,schedule,level)){
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
