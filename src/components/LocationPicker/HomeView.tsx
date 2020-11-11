
import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonMenuButton, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';
import marker from '../../theme/around.svg';
import './styles.css';

const Marker = (props:any) => (
  <>
    <div>{props.text}</div>
    <img src={marker} style={{
        color: 'white', padding: '10px', width:'60px', display: 'inline-flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: '100%', transform: 'translate(-50%, -80%)'
      }} alt="Marker" />
  </>
);
const HomeView = (props: any) => {
  const { center, getGeoLocation, loading, onClose} = props
  // const [state, setState] = useState({});
  const [address, setAddress] = useState('');
  const [currentPick, setCurrentPick] = useState({lat:center.lat, lng:center.lng, addresses:[], selectedAddress:''})
  const [location, setLocation] = useState({lat:0, lng:0, address:''});

  useEffect(() =>{
    setCurrentPick({lat:center.lat, lng:center.lng, addresses:[], selectedAddress:''});
    getAddress(center.lat, center.lng, '');
  }, [])

  async function getAddress (latitude: number, longitude:number, searchText:string) {
    console.log(latitude, longitude, searchText)
    if (!searchText || searchText.trim() === '') {
      console.log("Reverse Geo")
      const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBsqyN1XfESBdJHJL58hJOLeDPCZH6Y9Hg`)
      const reply = await res.json();
      console.log(reply);
      setCurrentPick(oldState=>{return {...oldState, addresses:reply.results}});
    } else {
      console.log("Geo")
      const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(searchText)}&key=AIzaSyBsqyN1XfESBdJHJL58hJOLeDPCZH6Y9Hg`)
      const reply = await res.json();
      console.log(reply);
      setCurrentPick(oldState=>{return {...oldState, addresses:reply.results}});
    }
  }

  const compareWith = (o1, o2) => {
    return o1 && o2 ? o1.address === o2.address : o1 === o2;
  };

  return (
    <>
      <IonPage id='main'>
        <IonHeader>
          <IonToolbar color='primary'>
            <IonButtons slot='start'>
              <IonMenuButton ></IonMenuButton>
            </IonButtons>
            <IonTitle slot="start">Map Geolocation</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {loading && <div className="full-content">
            <IonSpinner name="lines" />
          </div>}
          {!loading && <div className="GeoMap">
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyBsqyN1XfESBdJHJL58hJOLeDPCZH6Y9Hg' }}
              defaultCenter={center}
              // center={{lat: center.lat, lng: center.lng}}
              defaultZoom={16}
              onClick={(event)=>{
                setCurrentPick({...currentPick,lat:event.lat,lng:event.lng})
                getAddress(event.lat, event.lng, '');
              }}
            >
              <Marker lng={currentPick.lng} lat={currentPick.lat} text={''}/>
            </GoogleMapReact>
          </div>}

            <IonSearchbar 
              className='address' 
              onKeyUp={(e) => {
                if (e.key === 'Enter') getAddress(currentPick.lat, currentPick.lng, address)
              }} 
              value={address}
              onIonChange={(event) => {
                setAddress(event.detail.value || '' )/* ;console.log(event); */
              }}
                   /* onIonInput={(e)=>console.log(e)} */ 
            />

          {/* <IonItem className='geoAbs'>
            <IonLabel>
              <IonText>lat={currentPick.lat}</IonText>
              <IonText> lng={currentPick.lng}</IonText> 
              <IonText> Address: {currentPick.address}</IonText>
            </IonLabel>            
          </IonItem> */}
          <IonItem className='geoAbs'>
            <IonLabel>Address</IonLabel>
            <IonSelect 
              value={location} 
              interface="action-sheet" 
              placeholder='Select from List' 
              compareWith = {compareWith}
              onIonChange={e => {console.log(e.detail.value);setLocation(e.detail.value)}}>             
              {currentPick.addresses.map((result,i) => 
                  <IonSelectOption key={i}
                    value={{address:result.formatted_address, 
                            lat:result.geometry.location.lat, 
                            lng:result.geometry.location.lng}} >
                    {result.formatted_address}
                  </IonSelectOption>)}
            </IonSelect>
          </IonItem>
          <IonButton onClick={getGeoLocation} className='geoFooter1'>Current Location</IonButton>
          <IonButton onClick={()=>{console.log(location); onClose(location)}} className='geoFooter2'>Done</IonButton>
          
        </IonContent>
      </IonPage>
    </>
  )
}
export default HomeView