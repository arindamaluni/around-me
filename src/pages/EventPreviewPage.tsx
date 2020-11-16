import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import EventListing from '../components/EventListing/EventListing';

const EventPreviewPage = ({event}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Preview</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <EventListing
          eventList={event}
          authState={null}
          userProfile={null}
          toggleFavourite={null}
          discardOrWithdraw={null}
          mode={'preview'}
        />
      </IonContent>
    </IonPage>
  );
};

export default EventPreviewPage;
