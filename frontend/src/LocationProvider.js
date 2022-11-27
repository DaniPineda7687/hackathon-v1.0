import { Children, createContext, useReducer } from "react";
import locationReducer from "./LocationReducer";
import LocationReducer, { initialLocation } from "./LocationReducer";

const LocationContext = createContext();

function LocationProvider({children}){
    const[location, dispatch]= useReducer(locationReducer, initialLocation)
    return(
        <LocationContext.Provider value={[location,dispatch]}>
            {children}
        </LocationContext.Provider>
    );
}

export {LocationContext}
export default LocationProvider;