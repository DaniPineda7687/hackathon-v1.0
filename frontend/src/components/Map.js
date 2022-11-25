import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"

import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"
import { useContext } from 'react';
import Geocoder from "./Geocoder";
import { LocationContext } from "../LocationProvider";
export default function Map(){
    const [location, dispatch] = useContext(LocationContext);
    console.log(location)
    return(
        <ReactMapGL
          mapboxAccessToken='pk.eyJ1IjoiZGFuaXBpbmVkYTc2ODciLCJhIjoiY2xhdm1rd3IwMDczdTNzbXoyZXJhN29taCJ9.30hpkvZsDhbXyboZaVMtCw'
          initialViewState={{
            longitude:-73.6301814,
            latitude:4.152885,
            zoom:8,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
            <Marker
            latitude={location.lat}
            longitude={location.lng}
            draggable 
            />
            <NavigationControl position='bottom-right'/>
            <GeolocateControl
              position='top-left'
              trackUserLocation
            />
            <Geocoder/>
        </ReactMapGL>
    );
}