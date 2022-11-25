import axios from "axios";
import { distanceBetween } from "./distanceBetween";

export const colegiosCerca = async(userPosition,km) => {
  const resp = await axios.get('http://localhost:5000/colegiosApi/colegios/colegiosTotales');
  const coles = await resp.data;
  const colesCerca = coles.map(col => (distanceBetween(userPosition,col.geometry)/1000<=km) ? col._id : undefined ).filter(arry => arry!== undefined);
  console.log(colesCerca);
  return colesCerca;
}
