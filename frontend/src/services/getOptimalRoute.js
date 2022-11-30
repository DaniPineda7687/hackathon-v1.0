import axios from "axios"

const token = 'pk.eyJ1IjoiZGFuaXBpbmVkYTc2ODciLCJhIjoiY2xhdm1rd3IwMDczdTNzbXoyZXJhN29taCJ9.30hpkvZsDhbXyboZaVMtCw'
export const getOptimalRoute= async({userPosition=[1,1],schoolPosition=[1,1],method="driving"}={})=>{
    const [userLatitude,userLongitude] = userPosition;
    const [schoolLatitude,schoolLongitude] = schoolPosition;
    const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/${method}/${userLongitude},${userLatitude};${schoolLongitude},${schoolLatitude}?geometries=geojson&access_token=${token}`);
    const route = await response.data;
    console.log(route)
    const infoRoute= {geometry:route.routes[0].geometry,distanceTotal:route.routes[0].distance, timeTotal:route.routes[0].duration};
    
    return infoRoute;
}

