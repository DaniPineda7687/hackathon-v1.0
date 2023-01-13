import './styles/App.css';
import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"
import LocationProvider from './LocationProvider';
import Map from './components/Map';
import LoginSessionSchools from './components/LoginSessionSchools';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Inicio from './components/Inicio';
import MainPageSchools from './components/MainPageSchools';
function App() {
  return (
    <div className="App">
      <LocationProvider>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Inicio/>}/>
          <Route path='/mapa' element={<Map/>}/>
          <Route path='/LoginSessionSchools' element={<LoginSessionSchools/>}></Route>
          <Route path='/MainPageSchools/:id/:pass' element={<MainPageSchools/>}></Route>
        </Routes>
        </BrowserRouter>
      </LocationProvider>
    </div>
  );
}

export default App;
