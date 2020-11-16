export function storeEvents(events) {
  return {type: 'SET_EVENTS', payload: events};
}

export function addEvents(events) {
  return {type: 'ADD_EVENTS', payload: events};
}
