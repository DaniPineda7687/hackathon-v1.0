import ReactMapGL, { GeolocateControl, Marker, NavigationControl, Popup } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import "../styles/InfoCards.css"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"
import { useContext, useEffect, useMemo, useState } from 'react';
import Geocoder from "./Geocoder";
import { LocationContext } from "../LocationProvider";
import { colegios } from "../colegios";
import { colegiosCerca } from "../services/colegiosCercanos";
export default function Map(){
    const [popupInfo, setPopupInfo] = useState(null);
    const [location, dispatch] = useContext(LocationContext);
    useEffect(()=>{
      colegiosCerca([4.126964,-73.639689],2)
    },[])
    const pins = useMemo(
        () =>
          colegios.map((item, index) => (
            
            <Marker
              key={`marker-${index}`}
              longitude={item.geometry[1]}
              latitude={item.geometry[0]}
              anchor="bottom"
              onClick={e => {
                e.originalEvent.stopPropagation();
                setPopupInfo(item);
              }}
            >  
            </Marker>
          )),
        []
      );
/**
 * 
 */
    return(
        <ReactMapGL
          mapboxAccessToken='pk.eyJ1IjoiZGFuaXBpbmVkYTc2ODciLCJhIjoiY2xhdm1rd3IwMDczdTNzbXoyZXJhN29taCJ9.30hpkvZsDhbXyboZaVMtCw'
          initialViewState={{
            longitude:-73.6301814,
            latitude:4.152885,
            zoom:13,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
            <Marker
                latitude={location.lat}
                longitude={location.lng}
                draggable 
                color="red"
                scale={2}
            >
            </Marker>
            {pins}
            {popupInfo && (
                <Popup
                    anchor="top"
                    longitude={popupInfo.geometry[1]}
                    latitude={popupInfo.geometry[0]}
                    onClose={() => setPopupInfo(null)}
                >
                    <div className="school__card">
                        <h2 className="school__card__header">{popupInfo.nombre}</h2>
                        <div className="school__card__content">
                            <p><strong>Dirección:</strong> {popupInfo.direc}</p>
                            <p><strong>Cupos totales:</strong> {popupInfo.cuposTotales}</p>
                            <p><strong>Cupos disponibles:</strong> {popupInfo.cuposDisponibles}</p>
                            <p><a href="#">Ver más detalles</a></p>
                        </div>
                    </div>
                    <img width="100%"/>
                </Popup>
            )}
            <NavigationControl position='bottom-right'/>
            <GeolocateControl
              position='top-left'
              trackUserLocation
            />
            <Geocoder/>
        </ReactMapGL>
    );
}