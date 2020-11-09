import { useEffect, useState } from 'react';
import { auth as firebaseAuth } from './firebase';
import store from './store';
import authAction from './store/action-creators/auth-actions';

interface Auth {
  loggedIn: boolean;
  userId?: string;
}

interface AuthInit {
  loading: boolean;
}

export default function useAuthInit():AuthInit {
  const [authInit, setAuthInit] = useState<AuthInit>({ loading: true });
  store.dispatch(authAction({ loggedIn: false, auth:null }))
  useEffect(() => {
    return firebaseAuth.onAuthStateChanged((firebaseUser) => {
      const { uid, email, displayName, photoURL} = firebaseUser || {};
      const auth = firebaseUser ?
        { loggedIn: true, loginMethod:'email', uid, email, displayName, photoURL} :
        { loggedIn: false };
      setAuthInit({ loading: false});
      store.dispatch(authAction(auth))
      console.log("useAuthInit -> authInit:State Change:", firebaseUser)
      console.log("useAuthInit -> stateChange ->User:", store.getState())
    });
    
  }, []);
  
  return authInit;
}

export const something = "";