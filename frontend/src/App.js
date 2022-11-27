import './styles/App.css';
import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"
import LocationProvider from './LocationProvider';
import Map from './components/Map';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Inicio from './components/Inicio';
function App() {
  return (
    <div className="App">
      <LocationProvider>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Inicio/>}/>
          <Route path='/mapa' element={<Map/>}/>
        </Routes>
        </BrowserRouter>
      </LocationProvider>
    </div>
  );
}

export default App;
