import { useEffect, useState } from "react";
import { auth as firebaseAuth } from "./firebase";
import store from "./store";
import authAction from "./store/action-creators/auth-actions";
import setProfile from "./store/action-creators/profile-actions";
import loadProfile, { saveOrUpdateProfile } from "./utils/ProfileDBHandler";
/* import setLocationAction from './store/action-creators/location-actions';
import { getGeoLocation } from './utils/GetGeoLocation'; */

interface Auth {
  loggedIn: boolean;
  userId?: string;
}

interface AuthInit {
  loading: boolean;
}

export default function useAuthInit(): AuthInit {
  const [authInit, setAuthInit] = useState<AuthInit>({ loading: true });
  store.dispatch(authAction({ loggedIn: false, auth: null }));
  useEffect(() => {
    return firebaseAuth.onAuthStateChanged((firebaseUser) => {
      const { uid, email, photoURL } = firebaseUser || {};
      const auth = firebaseUser
        ? {
            loggedIn: true,
            loginMethod: "email",
            uid,
            email,
            displayName: getDisplayNameFromEmail(email),
            photoURL,
          }
        : { loggedIn: false };
      setAuthInit({ loading: false });
      store.dispatch(authAction(auth));
      if (uid) {
        let profile = null;
        loadProfile(uid).then((p) => {
          profile = p;
          if (!profile)
            profile = saveOrUpdateProfile({
              uid,
              email,
              displayName: getDisplayNameFromEmail(email),
            });
          store.dispatch(setProfile({ profile }));
        });
      }
      console.log(
        "useAuthInit -> stateChange ->User:",
        store.getState().authState
      );
    });
  }, []);

  return authInit;
}

const getDisplayNameFromEmail = (name) => {
  const id = name.split("@")[0];
  const namePart = id.split(".");
  const displayName = namePart.map(
    (part) => part.charAt(0).toUpperCase() + part.substr(1).toLowerCase()
  );
  return displayName.join(" ");
};

/* export const locationDispatcher = (payload)=> {
  console.log(payload)
  store.dispatch(setLocationAction(payload))
}

export const useLocationInit = () => {
  useEffect(() => {
    console.log('Getting Geolocation')
    getGeoLocation(null, f=>f, locationDispatcher)
  }, []);  
} */
