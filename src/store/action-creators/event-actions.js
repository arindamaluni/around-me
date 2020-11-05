export default function storeEvents(events) {
  return { type: "SET_EVENTS", payload: events };
}