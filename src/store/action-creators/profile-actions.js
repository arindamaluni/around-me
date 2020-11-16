export default function setProfile (profile) {
  return { type: "SET_PROFILE", payload: profile };
}

export function setLastLocation (location) {
  return { type: "SET_LAST_LOCATION", payload: location };
}

export function addToFavList (eventId) {
  return { type: "ADD_TO_FAB_LIST", payload: eventId}
}

export function removeFromFavList (eventId) {
  return { type: "REMOVE_FROM_FAB_LIST", payload: eventId}
}

export function addToDiscardedList (eventId) {
  return { type: "ADD_TO_DISCARDED_LIST", payload: eventId}
}