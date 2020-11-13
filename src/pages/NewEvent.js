import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonText, IonTextarea, IonTitle, IonToolbar, isPlatform } from '@ionic/react';
import dayjs from 'dayjs';
import firebase from 'firebase/app';
import * as geofirestore from 'geofirestore';
import { locationOutline, locationSharp } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import MapContainer from '../components/LocationPicker/MapContainer';
import { firestore, storage } from '../firebase';
import { ROUTE_EVENTS } from '../route-constants';
const {Camera} = Plugins;
const GeoFirestore = geofirestore.initializeApp(firestore);

const NewEvent =(props) => {
  
  const [ title, setTitle] = useState('');
  const [ highlight, setHighlight] = useState('');
  const [ overlay, setOverlay] = useState('');
  const [ summary, setSummary] = useState('');
  const [ perimeter, setPerimeter] = useState('');
  const [ date, setDate] = useState(dayjs(Date.now()).format('D MMM YYYY H:mm'));
  const [ venue, setVenue] = useState('');
  const [ location, setLocation] = useState({lat:0.0, lng:0.0, address:''});
  const [ locationPickOpen, setLocationPickOpen] = useState(false);

  const [pictureUrl, setPictureUrl] = useState('/assets/placeholder.png');
  const fileInputRef = useRef();
  const history = useHistory();

  useEffect(() => () => {
    if (pictureUrl.startsWith('blob:')) {
      URL.revokeObjectURL(pictureUrl);
    }
  }, [pictureUrl]);

  async function savePicture(blobUrl) {
    const pictureRef = storage.ref(
      `/events/pictures/${(Math.trunc((Math.random*10000))).toString() + Date.now()}`);
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const snapshot = await pictureRef.put(blob);
    const url = await snapshot.ref.getDownloadURL();
    console.log('saved picture:', url);
    return url;
  }

  async function submitHandler (e) {
    e.preventDefault();
    try {
      const entriesRef = GeoFirestore.collection('events');
      const entryData = getEventEntry(); 
      console.log(entryData);
      if (!pictureUrl.startsWith('/assets')) {
        entryData.pictureUrl = await savePicture(pictureUrl);
      }
      console.log(entryData.pictureUrl);
      const entryRef = await entriesRef.add(entryData);
      console.log('saved:', entryRef.id);
      history.goBack();
    } catch (err) {
      console.log(err)
    }
  }

  function getEventEntry () {
    console.log(+dayjs(date))
    return { 
      date: +dayjs(date), 
      title, highlight, overlay, summary, venue, 
      //the field name must be "coordinates for geofirestore to calculate hashing"
      coordinates: new firebase.firestore.GeoPoint(location.lat, location.lng),
      address:location.address,
      createdAt: new Date().getTime()
    }
  }

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const pictureUrl = URL.createObjectURL(file);
      setPictureUrl(pictureUrl);
    }
  };

  const handlePictureClick = async () => {
    if (isPlatform('capacitor')) {
      try {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Prompt,
          width: 600,
        });
        setPictureUrl(photo.webPath);
      } catch (error) {
        console.log('Camera error:', error);
      }
    } else {
      fileInputRef.current.click();
    }
  };

  const storeLocation = (location) => {
    console.log("NewEvent:storeLocation -> location", location)
    setLocation(location);
    setLocationPickOpen(false);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={ROUTE_EVENTS}/>
          </IonButtons>
          <IonTitle>New Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked" >Date</IonLabel>
          <IonDatetime value={date} color="primary" displayFormat="D MMM YYYY H:mm" 
            min={dayjs().format('YYYY-MM-DDTHH:mm') } max="2500"  
            onIonChange={(event) => setDate(event.detail.value)}
          />
        </IonItem>
        <IonItem>
            <IonLabel position="floating">Title/Heading</IonLabel>
            <IonInput value={title} type="text" placeholder="Headline of the Event"
              color="primary" onIonChange={(event) => setTitle(event.detail.value)}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="floating">Highlight/Caption</IonLabel>
            <IonInput value={highlight} type="text" placeholder="Highlight your events here/ See preview"
              color="primary" onIonChange={(event) => setHighlight(event.detail.value)}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="floating">Event Summary</IonLabel>
            <IonTextarea value={summary} type="text" placeholder="Event summary (500 letters)"
              color="primary" onIonChange={(event) => setSummary(event.detail.value)}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="floating">Image Overlay Text</IonLabel>
            <IonInput value={overlay} type="text" placeholder="Your Overlay Text/Optional"
              color="primary" onIonChange={(event) => setOverlay(event.detail.value)}
            />
        </IonItem>
        {/* <IonList> */}
          <IonItem>
            <IonLabel position="floating">Venue</IonLabel>
            <IonInput value={venue} type="text" placeholder="Venue Details"
              color="primary" onIonChange={(event) => setVenue(event.detail.value)}
            />
          </IonItem>
          <IonItem onClick={()=>{console.log(locationPickOpen); setLocationPickOpen(true)}}>
            <IonLabel position="stacked" value={location.address}>Location</IonLabel>
            <IonText type="text" placeholder="Your Overlay Text/Optional"
              color="primary">{location.address}</IonText>
            <IonIcon slot="end" md={locationSharp} ios={locationOutline} 
              color="primary" size="large" align="end"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Broadcast Perimeter</IonLabel>
            <IonInput value={perimeter} type="number" placeholder="Your realtime notification perimeter"
              color="primary" onIonChange={(event) => setPerimeter(event.detail.value)}
            />
          </IonItem>
          
          <IonItem>
            <IonLabel position="floating">Image</IonLabel><br />
            <input type="file" accept="image/*" hidden ref={fileInputRef}
              placeholder="Select display image from Phone or take Photo"
              color="primary" onChange={handleFileChange}
            />
            <img src={pictureUrl} alt="" style={{ cursor: 'pointer' }}
              onClick={handlePictureClick}
            />
          </IonItem>
          
        {/* </IonList> */}
        {locationPickOpen && <MapContainer isOpen={locationPickOpen} saveLocation={storeLocation}></MapContainer>}
        <IonButton expand="block" onClick={submitHandler}>Save</IonButton>
      </IonContent>
    </IonPage>
  );
}
export default NewEvent ;
