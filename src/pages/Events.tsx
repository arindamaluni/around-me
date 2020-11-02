import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import EventList from '../components/EventList/EventList';
import { firestore } from '../firebase';
// import './Page.css';
import { EventItem } from '../types';

const Events: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [events, setEvents] = useState([]);
  

  useEffect(() => {
    const entriesRef = firestore.collection('events');
    //The return is to ensure unsubscribe is called on unmount
    console.log('Fetch Called');
    return entriesRef.orderBy('date', 'desc')
      .onSnapshot(({ docs }) => setEvents(docs.map(EventItem.toEventItem)),
                  (err)=> {console.log(err)})
    
  }, []);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Current Events</IonTitle>
        </IonToolbar>
      </IonHeader>

      {events && 
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{name}</IonTitle>
            </IonToolbar>
          </IonHeader>
            <EventList eventList={events}/>   
        </IonContent>  
      }
    </IonPage>
  );
};

export default Events;
