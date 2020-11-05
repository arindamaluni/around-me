import { IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { add as addIcon } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import EventList from '../components/EventList/EventList';
import { firestore } from '../firebase';
import { ROUTE_NEWEVENT } from '../route-constants';
import storeEvents from '../store/action-creators/event-actions';
import { EventItem } from '../types';

const Events = ({ authState, events, setEvents}) => {

  useEffect(() => {
    const entriesRef = firestore.collection('events');
    //The return is to ensure unsubscribe is called on unmount
    console.log('Fetch Called');
    return entriesRef.orderBy('date', 'desc').where("date", ">", new Date().getTime())
      .onSnapshot(({ docs }) => setEvents(docs.map(EventItem.toEventItem)),
                  (err)=> {console.log(err)})
    
  }, [setEvents]);
  
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
      <IonContent fullscreen>
      {events && 
        <>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Upcoming Events</IonTitle>
            </IonToolbar>
          </IonHeader>
            <EventList eventList={events}/>   
        </>
      }
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink={ROUTE_NEWEVENT}>
            <IonIcon icon={addIcon} />
          </IonFabButton>
        </IonFab>
      </IonContent>    
    </IonPage>
  );
};

const mapStateToProps = ({ authState, events }) => ({
  authState, events
});

const mapDispatchToProps = dispatch => ({
  setEvents (events) {
    dispatch(storeEvents(events));
  },

});

export default connect( mapStateToProps, mapDispatchToProps )(Events);