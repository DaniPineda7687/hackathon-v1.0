import './styles/App.css';
import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import Geocoder from './components/Geocoder';
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"
import LocationProvider, { LocationContext } from './LocationProvider';
import { useContext } from 'react';
import Map from './components/Map';
function App() {
  /*const [location, dispatch] = useContext(LocationContext);
 console.log(location)*/
  return (
    <div className="App">
      <LocationProvider>
        <Map/>
      </LocationProvider>
    </div>
  );
}

export default App;
