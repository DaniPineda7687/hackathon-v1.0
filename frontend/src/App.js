import './styles/App.css';
import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"
import LocationProvider from './LocationProvider';
import Map from './components/Map';
import Header from './components/Header';
function App() {
  return (
    <div className="App">
      <LocationProvider>
        <Header/>
        <Map/>
      </LocationProvider>
    </div>
  );
}

export default App;
