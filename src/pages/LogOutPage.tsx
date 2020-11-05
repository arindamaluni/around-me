import { IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
// import { useAuth } from '../auth';
import { auth } from '../firebase';
import { ROUTE_LOGIN } from '../route-constants';

const LogOutPage = ({ authState}) => {
  
  console.log('Logging Out')
  const { loggedIn } = authState;
  // const loggedIn = false;
 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = useState({ loading: true, error: false });
  if (!loggedIn) {
    return <Redirect to={ROUTE_LOGIN} />;
  }

  auth.signOut().then(function() {
    console.log('Logged Out....', auth);
  }).catch(function(error) {
    console.log('error Logging out', error);
  });

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

export default connect( mapStateToProps )(LogOutPage);