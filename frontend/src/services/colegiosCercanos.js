import { distanceBetween } from "./distanceBetween";

export const colegiosCerca = (userPosition,coles,{perimeter=2,level="todos",schedule=["mañana","tarde","noche"],}={}) => {
  console.log(perimeter,level,schedule);
  //revisa si el array de colegios esta vacio
  if(coles.length!==0){
    //Revisa si el filtro viene vacio (cuando esta en todos por default es porque no llego nada)
    if(level==="todos"){
      //devuelve un array con todos los colegios en un perimetro de 12
      const colesCerca = coles.map(col => (distanceBetween(userPosition,col.geometry)<=(perimeter*1000)-100/*resta aproximativa :V */) ? col : undefined ).filter(arry => arry!== undefined);
      return colesCerca;
    }else{     
      //si vienen datos del filtro, devuelve un array de los colegios cercanos (pasado por parametro) y luego lo filtra dependiendo de si la el colegio tiene la jornada pasada por parametros (schedule)
      const colesCerca = coles.map(col => (distanceBetween(userPosition,col.geometry)<=(perimeter*1000)-500/*resta aproximativa :V */) ? col : undefined ).filter(arry => arry!== undefined);
        const colesFiltradosPorJorna = colesCerca.filter(position => Object.keys(position.jornada).map(horario=> {
        if(schedule.includes(horario)){
          return true
        }
      }).filter(arra=> arra!==undefined).length >=1);
      //Filtra el array anterior segun el schedule preguntando si el colegio tiene la escolaridad definida, si no la tiene es undefined y esto luego se filtra quitando los undefined
      const colesFiltradosPorLevel = colesFiltradosPorJorna.filter(position=>{
        return schedule.map(jornad=>position.jornada[jornad]?.escolaridad[level]!==undefined ? true : undefined).filter(arra=>arra!==undefined).length>=1
      })
      return colesFiltradosPorLevel;
    }
  }else{
    return [/*se devuelve un array vacio para que el .map se pueda */]
  }
}
