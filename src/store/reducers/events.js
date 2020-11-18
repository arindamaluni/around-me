export default function events(events = [], action) {
  switch (action.type) {
    case 'SET_EVENTS':
      return action.payload;
    case 'ADD_EVENTS':
      let tempEvents = [...events];
      action.payload.forEach(ev => {
        tempEvents = tempEvents.filter(event => event.id !== ev.id);
      });
      return tempEvents.concat(action.payload).sort((a, b) => a.date - b.date);
    default:
      return events;
  }
}
