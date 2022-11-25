export const distanceBetween = (firstPoint,secondPoint) => {
    const [lat1,lon1] = firstPoint;
    const [lat2,lon2] = secondPoint; 
    const R = 6371e3; // metres
    const tetta1 = lat1 * Math.PI/180; // φ, λ in radians
    const tetta2 = lat2 * Math.PI/180;
    const desplazamientoTetta = (lat2-lat1) * Math.PI/180;
    const desplazamientoLambda = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(desplazamientoTetta/2) * Math.sin(desplazamientoTetta/2) +
          Math.cos(tetta1) * Math.cos(tetta2) *
          Math.sin(desplazamientoLambda/2) * Math.sin(desplazamientoLambda/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres

    return d;
}
