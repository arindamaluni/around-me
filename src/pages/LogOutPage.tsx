import { Plugins } from '@capacitor/core';
import "@codetrix-studio/capacitor-google-auth";
import { IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
// import { useAuth } from '../auth';
import { auth } from '../firebase';
import { ROUTE_LOGIN } from '../route-constants';
import setAuthAction from '../store/action-creators/auth-actions';

const LogOutPage = ({ authState, setAuth}) => {
  
  console.log('Logging Out')
  const { loggedIn } = authState;
  // const loggedIn = false;
 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = useState({ loading: true, error: false });
  if (!loggedIn) {
    return <Redirect to={ROUTE_LOGIN} />;
  }

  const logoutFireBase = () => {
    auth.signOut().then(function() {
      console.log('Logged Out....', auth);
      setStatus({ loading: false, error: false });
      setAuth({ loggedIn: false });
    }).catch(function(error) {
      console.log('error Logging out', error);
    });
  }

  const logoutGoogleNative = async () => {  
    try {
      const result = await Plugins.GoogleAuth.signOut();
      console.log('Logout Successful')
      console.log(result);
      const auth = { loggedIn: false };
      setAuth(auth);
      setStatus({ loading: false, error: false });
    } catch (err) { console.log(err); }
    
  }
  
  if (loggedIn && authState.loginMethod === 'google') {
    logoutGoogleNative();
  } else if (loggedIn && authState.loginMethod === 'email') {
    logoutFireBase();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Log Out</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">    
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );

};


const mapStateToProps = ({ authState }) => ({
  authState
});

const mapDispatchToProps = dispatch => ({
  setAuth (auth) { dispatch(setAuthAction(auth)) }
});

export default connect( mapStateToProps, mapDispatchToProps )(LogOutPage);
