export default function locationReducer(location = {latitude:0, longitude:0, loading:false}, action) {
  switch (action.type) {
    case "SET_LOCATION":
      return {...location, ...action.payload};
    default:
      return location;
  }
}