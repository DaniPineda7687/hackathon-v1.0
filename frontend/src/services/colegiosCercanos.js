import axios from "axios";
import { distanceBetween } from "./distanceBetween";

export const colegiosCerca = async(userPosition,km) => {
  const resp = await axios.get('http://localhost:5000/colegiosApi/colegios/colegiosTotales');
  const coles = await resp.data;
  console.log(coles.map(col => {
    if(distanceBetween(userPosition,col.geometry)/1000<=km) return col._id; 
  }));
}
