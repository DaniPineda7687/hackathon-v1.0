import axios from "axios";

export const colegiosCerca = async(userPosition) => {
  const resp = await axios.get('http://localhost:5000/colegiosApi/colegios/colegiosTotales');
  const coles = await resp.data;
  console.log(coles)
}
