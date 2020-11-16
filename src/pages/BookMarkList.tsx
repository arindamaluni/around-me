import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {getDistance} from 'geolib';
import {add as addIcon} from 'ionicons/icons';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import EventListing from '../components/EventListing/EventListing';
import {firestore} from '../firebase';
import {ROUTE_NEWEVENT} from '../route-constants';
import {addEvents, storeEvents} from '../store/action-creators/event-actions';
import setLastLocation, {
  addToDiscardedList,
  addToFavList,
  removeFromFavList,
} from '../store/action-creators/profile-actions';
import {EventItem} from '../types';
import {saveOrUpdateProfile} from '../utils/ProfileDBHandler';

const Events = ({
  authState,
  events,
  location,
  setEvents,
  addNewEvents,
  profile,
  setLastLocation,
  addToFavList,
  removeFromFavList,
  addToDiscardedList,
}) => {
  function getValidLocation() {
    let currentLocation = location;
    if (currentLocation.latitude === 0) {
      currentLocation = profile.lastLocation;
    } else {
      setLastLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
    return currentLocation;
  }

  useEffect(() => {
    // Get current user location
    // Get snapshot of all future events
    const entriesRef = firestore.collection('events');
    entriesRef
      .where('date', '>', new Date().getTime())
      .get()
      .then(({docs}) => {
        const events = docs
          .map(EventItem.toEventItem)
          .filter(doc => isWithinPerimeter(doc, getValidLocation()));
        setEvents(events);
      });
    console.log('First fetch Called');
  }, [setEvents]);

  useEffect(() => {
    //Subscribe to realtime update on new events
    //The return is to ensure unsubscribe is called on unmount
    const entriesRef = firestore.collection('events');
    return entriesRef
      .orderBy('createdAt', 'desc')
      .where('createdAt', '>', new Date().getTime())
      .onSnapshot(
        ({docs}) => {
          // console.log(currentTime, new Date().getTime(), docs.map(EventItem.toEventItem));
          console.log('New Event posted.....');
          addNewEvents(
            docs
              .map(EventItem.toEventItem)
              .filter(doc => isWithinPerimeter(doc, getValidLocation())),
          );
        },
        err => {
          console.log(err);
        },
      );
  }, [addNewEvents, location]);

  const isWithinPerimeter = (eventItem, currentLoc) => {
    // console.log(eventItem, currentLoc);
    if (!eventItem || !eventItem.coordinates) return true;
    const {latitude, longitude} = eventItem.coordinates;

    if (
      !(
        eventItem?.perimeter &&
        latitude &&
        longitude &&
        currentLoc.latitude &&
        currentLoc.longitude
      )
    )
      return true;

    const distance = getDistance(
      {latitude, longitude},
      {latitude: currentLoc.latitude, longitude: currentLoc.longitude},
    );
    eventItem.distance = distance;
    console.log(distance);
    if (distance <= eventItem?.perimeter) return true;
    console.log('Outside Geo perimeter');
    return false;
  };

  const toggleFavourite = eventId => {
    console.log(profile.favList, eventId);
    if (profile.favList.includes(eventId)) {
      removeFromFavList(eventId);
    } else {
      addToFavList(eventId);
    }
    console.log(profile);
    saveOrUpdateProfile(profile);
  };

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
      <IonContent>
        {events && (
          <>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Upcoming Events</IonTitle>
              </IonToolbar>
            </IonHeader>
            {/* <EventList eventList={events}/>   */}
            <EventListing
              eventList={events}
              authState={authState}
              userProfile={profile}
              toggleFavourite={toggleFavourite}
              discardOrWithdraw={addToDiscardedList}
            />
          </>
        )}
      </IonContent>
      <IonFooter>
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink={ROUTE_NEWEVENT}>
            <IonIcon icon={addIcon} />
          </IonFabButton>
        </IonFab>
      </IonFooter>
    </IonPage>
  );
};

const mapStateToProps = ({authState, events, location, profile}) => ({
  authState,
  events,
  location,
  profile,
});

const mapDispatchToProps = dispatch => ({
  setEvents(events) {
    dispatch(storeEvents(events));
  },
  addNewEvents(events) {
    dispatch(addEvents(events));
  },
  setLastLocation(location) {
    dispatch(setLastLocation({location}));
  },
  addToFavList(eventId) {
    dispatch(addToFavList({eventId}));
  },
  removeFromFavList(eventId) {
    dispatch(removeFromFavList({eventId}));
  },
  addToDiscardedList(eventId) {
    dispatch(addToDiscardedList({eventId}));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
