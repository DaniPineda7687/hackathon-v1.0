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
import axios from "axios";

const totalcoles = async()=>{
  const resp = await axios.get('http://localhost:5000/colegiosApi/colegios/colegiosTotales');
  const totalColegios = await resp.data;
  return totalColegios;
}
console.log("d")
export default function Map(){
  const [renderCount,setRenderCount]= useState(1);
    const [popupInfo, setPopupInfo] = useState(null);
    const [coles,setColegiosCercanos]= useState([]);
    const [location, dispatch] = useContext(LocationContext);
    const [totalidadColes,setTotalidadColes]=useState([])

    const userPosition = [location.lat,location.lng];

    useEffect(()=>{
      totalcoles().then(res=>setTotalidadColes(res))
      console.log(totalidadColes.length!==0 ? totalidadColes : "primer useeffect");
    },[totalidadColes.length])

    useEffect(()=>{
      console.log("segundo useeffect");
      console.log(location)
      setColegiosCercanos(colegiosCerca(userPosition,2,totalidadColes))
      /*Condiciones*/
      if(location.conditions){
        let perimeter = location.conditions[0].perimeter;
        setColegiosCercanos(colegiosCerca(userPosition,perimeter,totalidadColes));
        
        console.log(location);
      }
      console.log("despues del segundo")
    },[renderCount,location])
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
                  onDrag={(e)=>{dispatch({type:"UPDATE_LOCATION", payload:{lat:e.lngLat.lat,lng:e.lngLat.lng, conditions:location.conditions}}); setRenderCount(renderCount+1)}} 
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
              onGeolocate={(e)=>{dispatch({type:"UPDATE_LOCATION", payload:{lat:e.coords.latitude,lng:e.coords.longitude,conditions:location.conditions}}); setRenderCount(renderCount+1)}}
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
                            <th className="title__table">CUPOS DISPONIBLES SEGÚN JORNADA</th>
                          </tr>
                          <div className="horarios__container">

                          {
                            Object.keys(popupInfo.jornada).map(valor=>{
                              return(
                                <div className="jornada__container">
                                <tr><h3 className="title__jornada">{`${valor.toUpperCase()}`}</h3></tr>
                                {Object.keys(popupInfo.jornada[valor].escolaridad).map(educacion=>{
                                  return(
                                    <>
                                      <tr><h4 className="title__level">{educacion}</h4></tr>
                                      <ul>
                                        {Object.keys(popupInfo.jornada[valor].escolaridad[educacion]).map(grado=>{
                                          return(
                                            <li>{`${grado}: ${popupInfo.jornada[valor].escolaridad[educacion][grado]}`}</li>
                                          )
                                        })}
                                      </ul>
                                    </>
                                  )
                                })}
                                </div>
                              )
                            })
                          }
                          </div>
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