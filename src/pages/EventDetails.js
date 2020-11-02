import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

function EventDetails ({postHandler}) {
  
  async function deleteHandler (e) {
    // e.preventDefault();

  }

  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonTitle>{formatDate(entry?.date)}</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={handleDelete}>
            <IonIcon icon={trashIcon} slot="icon-only" />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <h2>{entry?.title}</h2>
      <img src={entry?.pictureUrl} alt={entry?.title} />
      <p>{entry?.description}</p>
    </IonContent>
  </IonPage>
  );
}
export default EventDetails ;
