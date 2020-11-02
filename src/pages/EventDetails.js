import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { trash } from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router';

function EventDetails () {

  const history = useHistory();
  const back = ()=> {history.goBack();}
  async function handleDelete (e) {
    // e.preventDefault();

  }

  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonTitle>Event Details</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={handleDelete}>
            <IonIcon icon={trash} slot="icon-only" />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
          <IonCardTitle>Card Title</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          Keep close to Nature's heart... and break clear away, once in awhile,
          and climb a mountain or spend a week in the woods. Wash your spirit clean.
        </IonCardContent>
      </IonCard>
      <IonButton onClick={back}>Back</IonButton>
    </IonContent>
  </IonPage>
  );
}
export default EventDetails ;
