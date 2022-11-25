const initialLocation={lat:"1",lng:"1", conditions:[{perimeter:0,level:"",schedule:[]}]}
function locationReducer(state, action){
    switch(action.type){
        case "UPDATE_LOCATION":
            return {lat:action.payload.lat, lng:action.payload.lng, ...initialLocation.conditions}
        case "UPDATE_CONDITIONS":
            return {lat:action.payload.lat,lng:action.payload.lng,conditions:action.payload.conditions}
        default:
            return state;
    }
}
export {initialLocation}
export default locationReducer