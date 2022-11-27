import { distanceBetween } from "./distanceBetween";

export const colegiosCerca = (userPosition,{perimeter=12,level="todos",schedule=["mañana","tarde","noche"],}={},coles) => {
  console.log(perimeter,level,schedule);
  if(coles.length!==0){
    if(level==="todos"){
      const colesCerca = coles.map(col => (distanceBetween(userPosition,col.geometry)<=(perimeter*1000)-100/*resta aproximativa :V */) ? col : undefined ).filter(arry => arry!== undefined);
      return colesCerca;
    }else{
      
      const colesCerca = coles.map(col => (distanceBetween(userPosition,col.geometry)<=(perimeter*1000)-100/*resta aproximativa :V */) ? col : undefined ).filter(arry => arry!== undefined);
      
      //console.log("colegios cercanos a los km pasados ",colesCerca);
      const colesFiltradosPorJorna = colesCerca.filter(position => Object.keys(position.jornada).map(horario=> {
        if(schedule.includes(horario)){
          return true
        }
      }).filter(arra=> arra!==undefined).length >=1);

      //console.log("colegios cercanos a los km pasados y jornada ",colesFiltradosPorJorna);

      const colesFiltradosPorLevel = colesFiltradosPorJorna.filter(position=>{
        return schedule.map(jornad=>position.jornada[jornad]?.escolaridad[level]!==undefined ? true : undefined).filter(arra=>arra!==undefined).length>=1
      })
      
      console.log(colesFiltradosPorLevel);
      /*return colesFiltradosPorLevel;*/
      return colesFiltradosPorLevel;
    }
  }else{
    return [/*se devuelve un array vacio para que el .map se pueda */]
  }
}
