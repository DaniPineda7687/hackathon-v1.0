import './styles/App.css';
import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"
import LocationProvider from './LocationProvider';
import Map from './components/Map';
import {BrowserRouter,Routes,Route} from "react-router-dom"
function App() {
  return (
    <div className="App">
      <LocationProvider>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Map/>}/>
        </Routes>
        </BrowserRouter>
      </LocationProvider>
    </div>
  );
}

export default App;
