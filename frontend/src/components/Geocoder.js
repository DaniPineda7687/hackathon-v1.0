import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder"
import { useContext } from "react";
import { useControl } from "react-map-gl";
import { LocationContext } from "../LocationProvider";

export default function Geocoder(){
    const [location, dispatch] = useContext(LocationContext);

    const ctrl = new MapBoxGeocoder({
        accessToken:"pk.eyJ1IjoiZGFuaXBpbmVkYTc2ODciLCJhIjoiY2xhdm1rd3IwMDczdTNzbXoyZXJhN29taCJ9.30hpkvZsDhbXyboZaVMtCw",
        marker:true,
        collapsed:true,
    })
    useControl(()=>ctrl)
    ctrl.on("result",(e)=>{
        const coords = e.result.geometry.coordinates
        dispatch({type:"UPDATE_LOCATION", payload:{lat:coords[1],lng:coords[0]}})
        console.log(coords); 
        console.log(location);
    })
    return null;
}