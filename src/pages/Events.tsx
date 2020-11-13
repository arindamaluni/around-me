// import { Capacitor, Geolocation, Toast } from '@capacitor/core';
import { Toast } from '@capacitor/core';
import { IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { add as addIcon } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import EventList from '../components/EventList/EventList';
import { firestore } from '../firebase';
import { ROUTE_NEWEVENT } from '../route-constants';
import { addEvents, storeEvents } from '../store/action-creators/event-actions';
import { EventItem } from '../types';
// import LocationService from '../utils/Location';
import { getGeoLocation } from '../utils/GetGeoLocation';

const Events = ({ authState, events, setEvents, addNewEvents}) => {

  const [state, setState] = useState({ 
    center: {
      lat: 0, //TODO: set the Home Location
      lng: 0 
    },
    loading: false,
  });

  const toastHandler = async (message) => {
    await Toast.show({text: message });
  }

  useEffect(() => {
    //Get current user location
    getGeoLocation(setState, toastHandler);
    // Get snapshot of all future events
    const entriesRef = firestore.collection('events')
    entriesRef.where("date", ">", new Date().getTime()).get()
    .then(({docs}) => {
      const events = docs.map(EventItem.toEventItem);
      setEvents(events);
    });

    //Subscribe to realtime update on new events
    //The return is to ensure unsubscribe is called on unmount
    console.log('Fetch Called');
    return entriesRef.orderBy('createdAt', 'desc').where("createdAt", ">", new Date().getTime())
      .onSnapshot(({ docs }) => {
        // console.log(currentTime, new Date().getTime(), docs.map(EventItem.toEventItem));
        addNewEvents(docs.map(EventItem.toEventItem))},
                  (err)=> {console.log(err)})
  }, [setEvents, addNewEvents]);
 
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
  setEvents (events) { dispatch(storeEvents(events)) },
  addNewEvents (events) { dispatch(addEvents(events)) }
});

export default connect( mapStateToProps, mapDispatchToProps )(Events);