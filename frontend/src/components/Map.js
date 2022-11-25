import ReactMapGL, { GeolocateControl, Marker, NavigationControl, Popup } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import "../styles/InfoCards.css"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"
import { useContext, useEffect, useMemo, useState } from 'react';
import Geocoder from "./Geocoder";
import { LocationContext } from "../LocationProvider";
import { colegiosCerca } from "../services/colegiosCercanos";
import Header from "./Header";
import FormBusqueda from "./FormBusqueda";
export default function Map(){
    const [popupInfo, setPopupInfo] = useState(null);
    const [coles,setColegiosCercanos]= useState([])
    const [location, dispatch] = useContext(LocationContext);
    useEffect(()=>{
      colegiosCerca([location.lat,location.lng],2).then(res=>setColegiosCercanos(res))
      //dispatch({type:"UPDATE_LOCATION", payload:{lat:e.lngLat.lat,lng:e.lngLat.lng}})

    },[coles])
    const pins = useMemo(
        () =>
          coles.map((item, index) => (
            
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
        [location,coles]
      );
/**
 * 
 */
    return(
      <>
      <Header/>
      <FormBusqueda/>
        <div className="map__container">
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
                  onDrag={(e)=>{dispatch({type:"UPDATE_LOCATION", payload:{lat:e.lngLat.lat,lng:e.lngLat.lng}})}} 
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
                        </div>
                    </div>
                    <img width="100%"/>
                </Popup>
            )}
            <NavigationControl position='bottom-right'/>
            <GeolocateControl
              position='top-left'
              trackUserLocation
              onGeolocate={(e)=>{dispatch({type:"UPDATE_LOCATION", payload:{lat:e.coords.latitude,lng:e.coords.longitude}})}}
            />
            <Geocoder/>
        </ReactMapGL>
        <div className={`card__more__information ${popupInfo==null ? "card__hidden" : "card__visible"}` }>
            {
                popupInfo 
                ? 
                    <div className="more__information__container">
                        <h2>{popupInfo.nombre}</h2> 
                        <table>
                          <tr>
                            <th>Cupos según cursos</th>
                          </tr>
                          {
                            //Object.keys(popupInfo.jornada?.tarde.escolaridad?.primaria).map(posicion => console.log(popupInfo.jornada?.tarde.escolaridad?.primaria.posicion))
                            //console.log(Object.keys(popupInfo.jornada?.tarde.escolaridad?.primaria))
                          }
                            <tr>
                                <th>{popupInfo.jornada.mañana.escolaridad.bachiller.sexto}</th>
                                <th>Contact</th>
                                <th>Country</th>
                            </tr>
                            <tr>
                                <td>Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                <td>Centro comercial Moctezuma</td>
                                <td>Francisco Chang</td>
                                <td>Mexico</td>
                            </tr>
                        </table>
                    </div>
                : 
                ""
            }
        </div>
        </div>
        </>
    );
}