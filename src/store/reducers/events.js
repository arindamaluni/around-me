export default function events(events = [], action) {
  switch (action.type) {
    case "SET_EVENTS":
      return action.payload;
    default:
      return events;
  }
}
