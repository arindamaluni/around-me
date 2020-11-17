import {Plugins} from '@capacitor/core';
import '@codetrix-studio/capacitor-google-auth';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
} from '@ionic/react';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {auth} from '../firebase';
import {ROUTE_EVENTS, ROUTE_REGISTER} from '../route-constants';
import setAuthAction from '../store/action-creators/auth-actions';
import setProfile from '../store/action-creators/profile-actions';
import google from '../theme/google.svg';
import loadProfile, {saveOrUpdateProfile} from '../utils/ProfileDBHandler';

const LoginPage = props => {
  console.log(props);
  const {loggedIn} = props.authState;
  // const loggedIn = false;
  console.log('Logging in.........1');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({loading: false, error: false});

  const handleLogin = async () => {
    try {
      setStatus({loading: true, error: false});
      const credential = await auth.signInWithEmailAndPassword(email, password);
      console.log('credential:', credential);
    } catch (error) {
      setStatus({loading: false, error: true});
      console.log('error:', error);
    }
  };

  const loginGoogleNative = async () => {
    const {setAuth, setProfile} = props;
    try {
      const result = await Plugins.GoogleAuth.signIn();
      console.log('Login Successful');
      console.log(result);
      const auth = {
        loggedIn: true,
        loginMethod: 'google',
        uid: result.id,
        email: result.email,
        displayName: result.name,
        photoURL: result.imageUrl,
      };
      setAuth(auth);
      let profile = await loadProfile(result.uid);
      console.log(profile);
      if (!profile)
        profile = await saveOrUpdateProfile({
          uid: result.id,
          email: result.email,
          displayName: result.name,
          photoURL: result.imageUrl,
        });

      console.log(profile);
      setProfile({profile});
    } catch (err) {
      console.log(err);
    }
  };

  if (loggedIn) {
    console.log('Redirecting to Events');
    return <Redirect to={ROUTE_EVENTS} />;
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <p style={{fontSize: '30px', fontWeight: 'bold'}}></p>
          <img style={{width: '50%'}} src={'/assets/icon/around.svg'} alt="" />
          <p
            style={{
              fontFamily: 'Montserrat',
              fontSize: '60px',
              color: '#92949c',
              fontWeight: 'bold',
              width: '100%',
              textAlign: 'center',
              padding: '0px',
              margin: '0px',
            }}
          >
            Around
          </p>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#FF0077',
              letterSpacing: '4px',
              width: '100%',
              textAlign: 'center',
              padding: '0px',
              margin: '0px',
            }}
          >
            your beautiful neighborhood
          </p>
          <p style={{fontSize: '30px', fontWeight: 'bold'}}></p>
        </div>
        <IonList>
          <IonItem>
            <IonLabel position="floating" color="medium">
              Email
            </IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={event => setEmail(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating" color="medium">
              Password
            </IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={event => setPassword(event.detail.value)}
            />
          </IonItem>
        </IonList>
        {status.error && <IonText color="danger">Invalid credentials</IonText>}
        <IonButton expand="block" onClick={handleLogin}>
          Login
        </IonButton>
        <IonButton expand="block" color="primary" onClick={loginGoogleNative}>
          <IonIcon slot="start" icon={google} />
          Login with Google
        </IonButton>
        <IonButton expand="block" fill="clear" routerLink={ROUTE_REGISTER}>
          Don't have an account?
        </IonButton>
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = ({authState}) => ({
  authState,
});

const mapDispatchToProps = dispatch => ({
  setAuth(auth) {
    dispatch(setAuthAction(auth));
  },
  setProfile(profile) {
    dispatch(setProfile(profile));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
