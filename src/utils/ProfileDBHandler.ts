import { firestore } from "../firebase";

export default async function loadProfile (uid) {
  if (!uid) return null;
  try {
    const entriesRef = firestore.collection('users').doc(uid)
    const user = await entriesRef.get();
    console.log(user)
    return user.data();
  } catch (err) { 
    console.log('Error getting Profile', err);
  }
  return null;
}

export async function saveOrUpdateProfile (profile) {
  if (!profile.uid || profile.uid==='') {
    console.log('uid for the profile is nonexistent')
    return null;
  }
  try {
    console.log('Creating Profile:', profile)
    const entriesRef = firestore.collection('users').doc(profile.uid)
    let user = await entriesRef.get();
    console.log('User:', user)
    if (!user.exists) {
      await entriesRef.set(profile);
    } else {
      await entriesRef.update(profile);
    }
    const userData = await entriesRef.get();
    console.log(userData)
    return userData.data();
  } catch (err) {
    console.log('Error Updating profile', err)
  }
}