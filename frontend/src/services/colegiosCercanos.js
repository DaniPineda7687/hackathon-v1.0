import { distanceBetween } from "./distanceBetween";

export const colegiosCerca = (userPosition,km,coles) => {
  if(coles.length!==0){
    const colesCerca = coles.map(col => (distanceBetween(userPosition,col.geometry)<=(km*1000)-500) ? col : undefined ).filter(arry => arry!== undefined);
    return colesCerca;
  }else{
    return [/*se devuelve un array vacio para que el .map se pueda */]
  }
}
