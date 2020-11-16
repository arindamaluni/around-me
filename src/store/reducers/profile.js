export default function profileReducer(
  profile = {
    uid: "",
    displayName: "",
    email: "",
    lastLocation: { latitude: 0, longitude: 0 },
    favList: [],
    discardedList: [],
  },
  action
) {
  switch (action.type) {
    case "SET_PROFILE":
      return { ...profile, ...action.payload.profile };
    case "SET_LAST_LOCATION":
      return { ...profile, lastLocation: action.payload.lastLocation };
    case "ADD_TO_FAB_LIST":
      return {
        ...profile,
        favList: profile.favList.concat(action.payload.eventId),
      };
    case "REMOVE_FROM_FAB_LIST":
      return {
        ...profile,
        favList: profile.favList.filter(
          (eventId) => eventId !== action.payload.eventId
        ),
      };
    case "ADD_TO_DISCARDED_LIST":
      return {
        ...profile,
        discardedList: profile.discardedList.concat(action.payload.eventId),
      };
    default:
      return profile;
  }
}
