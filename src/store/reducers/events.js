export default function events(events = [], action) {
  switch (action.type) {
    case 'SET_EVENTS':
      return action.payload;
    case 'ADD_EVENTS':
      return events.concat(action.payload).sort((a, b) => a.date - b.date);
    default:
      return events;
  }
}
