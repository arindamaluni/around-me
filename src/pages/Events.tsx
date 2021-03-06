import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
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
import {ROUTE_EVENTS, ROUTE_NEWEVENT} from '../route-constants';
import {addEvents, storeEvents} from '../store/action-creators/event-actions';
import {
  addToDiscardedList,
  addToFavList,
  removeFromFavList,
  setLastLocation,
} from '../store/action-creators/profile-actions';
import {EventItem} from '../types';
import {saveOrUpdateEvent} from '../utils/EventDBHandler';
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
  mode,
  posts,
  pageTitle,
}) => {
  function getValidLocation() {
    return location.latitude === 0 ? profile.lastLocation : location;
    // let currentLocation = location;
    // if (currentLocation.latitude === 0) {
    //   currentLocation = profile.lastLocation;
    // } else {
    //   console.log(location.latitude, location.longitude)
    //   // setLastLocation({
    //   //   latitude: location.latitude,
    //   //   longitude: location.longitude,
    //   // });
    // }
    // return currentLocation;
  }

  useEffect(() => {
    console.log(mode);
    if (mode) return;
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
    console.log('First fetch Called', location.latitude, location.longitude);
    //Set last location in profile
    setLastLocation({
      latitude: location.latitude,
      longitude: location.longitude,
    });
  }, [setEvents]);

  useEffect(() => {
    if (mode) return;
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
  }, [addNewEvents]);

  //Prepare display eventlist based on mode
  let eventList = events;
  if (mode === 'favourite') {
    eventList = events.filter(event => profile.favList.includes(event.id));
  } else if (mode === 'myposts') {
    eventList = posts;
  }
  if (mode) {
    eventList.forEach(
      event =>
        (event.distance = getDistanceFromCurrentLocation(
          event,
          getValidLocation(),
        )),
    );
  }

  function getDistanceFromCurrentLocation(eventItem, currentLoc) {
    if (!eventItem || !eventItem.coordinates) return -1;
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
      return -1;

    const distance = getDistance(
      {latitude, longitude},
      {latitude: currentLoc.latitude, longitude: currentLoc.longitude},
    );
    return Number.isNaN(distance) ? 0 : distance + 0.001;
  }

  const isWithinPerimeter = (eventItem, currentLoc) => {
    // console.log(eventItem, currentLoc);
    const distance = getDistanceFromCurrentLocation(eventItem, currentLoc);
    if (distance < 0) return true;
    eventItem.distance = distance;
    console.log(distance);
    if (distance <= eventItem?.perimeter) return true;
    console.log('Outside Geo perimeter:', eventItem.id);
    return false;
  };

  const toggleFavourite = eventId => {
    if (profile.favList.includes(eventId)) {
      removeFromFavList(eventId);
    } else {
      addToFavList(eventId);
    }
    console.log(profile);
    saveOrUpdateProfile(profile);
  };

  const discardOrWithdraw = (eventId, availability = null) => {
    const event = eventList.find(event => event.id === eventId);
    if (event && event.publisherId === profile.uid) {
      event.availability = availability;
      saveOrUpdateEvent({id: eventId, availability});
    } else if (event) {
      addToDiscardedList(eventId);
      saveOrUpdateProfile(profile);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {!mode ? (
              <IonMenuButton />
            ) : (
              <IonBackButton defaultHref={ROUTE_EVENTS} />
            )}
          </IonButtons>
          <IonTitle>{pageTitle ? pageTitle : 'Current Events'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {eventList.length && (
          <>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Upcoming Events</IonTitle>
              </IonToolbar>
            </IonHeader>
            {/* <EventList eventList={events}/>   */}
            <EventListing
              eventList={eventList}
              authState={authState}
              userProfile={profile}
              toggleFavourite={toggleFavourite}
              discardOrWithdraw={discardOrWithdraw}
              mode={'listing'}
            />
          </>
        )}
        {!eventList.length && (
          <IonItem>
            <IonLabel ion-text-center>No posts for display</IonLabel>
          </IonItem>
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
  setLastLocation(lastLocation) {
    dispatch(setLastLocation({lastLocation}));
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
