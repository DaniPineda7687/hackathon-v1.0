import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"
import { useContext, useMemo } from 'react';
import Geocoder from "./Geocoder";
import { LocationContext } from "../LocationProvider";
import { colegios } from "../colegios";
export default function Map(){
    const [location, dispatch] = useContext(LocationContext);
    console.log(colegios)


    const pins = useMemo(
        () =>
          colegios.map((item, index) => (
            
            <Marker
              key={`marker-${index}`}
              longitude={item.geometry[1]}
              latitude={item.geometry[0]}
              anchor="bottom"
            >
            </Marker>
          )),
        []
      );
/**
 * <Marker
            latitude={location.lat}
            longitude={location.lng}
            draggable 
            />
 */
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
          
            {pins}
            
            <NavigationControl position='bottom-right'/>
            <GeolocateControl
              position='top-left'
              trackUserLocation
            />
            <Geocoder/>
        </ReactMapGL>
    );
}