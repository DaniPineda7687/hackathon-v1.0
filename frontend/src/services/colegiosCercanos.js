export const colegiosCerca = async (userPosition) => {
  const response = await fetch('./colegios.json');
  let colegiosData = await response.json();
}
