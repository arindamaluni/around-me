import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import moment from 'moment';
import React, { useState } from 'react';
import { firestore } from '../firebase';

function NewEvent ({postHandler}) {
  
  const [ title, setTitle] = useState('');
  const [ date, setDate] = useState(moment(Date.now()).format('lll'));
  const [ venue, setVenue] = useState('');

  async function submitHandler (e) {
    // e.preventDefault();
    try {
      const entriesRef = firestore.collection('events')
      const entryData = { date, title, venue }; 
      const entryRef = await entriesRef.add(entryData);
      console.log('saved:', entryRef.id);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/page/events"/>
          </IonButtons>
          <IonTitle>New Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Date</IonLabel>
          <IonDatetime value={date}
            onIonChange={(event) => setDate(event.detail.value)}
          />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Event Details</IonLabel>
            <IonTextarea value={title}
              onIonChange={(event) => setTitle(event.detail.value)}
            />
        </IonItem>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Venue</IonLabel>
            <IonInput value={venue}
              onIonChange={(event) => setVenue(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Picture</IonLabel><br />
            <input type="file" accept="image/*" hidden ref={null}
              onChange={null}
            />
            <img src={null} alt="" style={{ cursor: 'pointer' }}
              onClick={null}
            />
          </IonItem>
          
        </IonList>
        <IonButton expand="block" onClick={submitHandler}>Save</IonButton>
      </IonContent>
    </IonPage>
  );
}
export default NewEvent ;
