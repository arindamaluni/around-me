import { useEffect, useState } from 'react';
import authAction from './action-creators/auth-actions';
import { auth as firebaseAuth } from './firebase';
import store from './store';

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
  console.log("useAuthInit -> authInit")
  useEffect(() => {
    return firebaseAuth.onAuthStateChanged((firebaseUser) => {
      const auth = firebaseUser ?
        { loggedIn: true, userId: firebaseUser.uid } :
        { loggedIn: false };
      setAuthInit({ loading: false});
      store.dispatch(authAction(auth))
      console.log(firebaseUser)
      console.log("useAuthInit -> stateChange ->User:", store.getState())
    });
    
  }, []);
  
  return authInit;
}

export const something = "";