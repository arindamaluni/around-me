import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToolbar, isPlatform } from '@ionic/react';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { firestore, storage } from '../firebase';
import { ROUTE_EVENTS } from '../route-constants';
const {Camera} = Plugins;

function NewEvent ({postHandler}) {
  
  const [ title, setTitle] = useState('');
  const [ date, setDate] = useState(moment(Date.now()).format('lll'));
  const [ venue, setVenue] = useState('');
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
    // e.preventDefault();
    try {
      const entriesRef = firestore.collection('events');
      const entryData = { date: new Date(date).getTime(), title, venue }; 
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
            <input type="file" accept="image/*" hidden ref={fileInputRef}
              onChange={handleFileChange}
            />
            <img src={pictureUrl} alt="" style={{ cursor: 'pointer' }}
              onClick={handlePictureClick}
            />
          </IonItem>
          
        </IonList>
        <IonButton expand="block" onClick={submitHandler}>Save</IonButton>
      </IonContent>
    </IonPage>
  );
}
export default NewEvent ;
