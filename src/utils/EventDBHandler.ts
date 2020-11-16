import { firestore } from "../firebase";

export async function saveOrUpdateEvent (event) {

  try {
    console.log('Updating Event:', event)
    const entriesRef = firestore.collection('events').doc(event.id)
    let ev = await entriesRef.get();
    console.log('Event:', ev)
    if (!ev.exists) {
      await entriesRef.set(event);
    } else {
      await entriesRef.update(event);
    }
    const evData = await entriesRef.get();
    console.log(evData)
    return evData.data();
  } catch (err) {
    console.log('Error Updating event', err)
  }
}