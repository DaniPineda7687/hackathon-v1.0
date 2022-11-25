const initialLocation={lat:"1",lng:"1"}
function locationReducer(state, action){
    switch(action.type){
        case "UPDATE_LOCATION":
            return {lat:action.payload.lat, lng:action.payload.lng}
        default:
            return state;
    }
}
export {initialLocation}
export default locationReducer