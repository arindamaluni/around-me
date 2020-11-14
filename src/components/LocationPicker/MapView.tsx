
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import GoogleMapReact from 'google-map-react';
import { arrowBackOutline, arrowBackSharp, locateOutline, locateSharp } from 'ionicons/icons';
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
const MapView = (props: any) => {
  const { center, getGeoLocation, loading, onClose, pageTitle, readOnly} = props
  // const [state, setState] = useState({});
  const [address, setAddress] = useState('');
  const [currentPick, setCurrentPick] = useState({lat:center.lat, lng:center.lng, addresses:[]})
  const [location, setLocation] = useState({lat:0, lng:0, address:''});

  useEffect(() =>{
    setCurrentPick({lat:center.lat, lng:center.lng, addresses:[]});
    if(!readOnly)
      getAddress(center.lat, center.lng, '');
  }, [center])

  // const addressList = useRef<HTMLIonSelectElement>(null);

  async function getAddress (latitude: number, longitude:number, searchText:string) {
    // console.log(latitude, longitude, searchText)
    if (!searchText || searchText.trim() === '') {
      console.log("Reverse Geo")
      const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBsqyN1XfESBdJHJL58hJOLeDPCZH6Y9Hg`)
      const reply = await res.json();
      // console.log(reply);
      setCurrentPick(oldState=>{return {...oldState, addresses:reply.results}});
    } else {
      console.log("Geo")
      const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(searchText)}&key=AIzaSyBsqyN1XfESBdJHJL58hJOLeDPCZH6Y9Hg`)
      const reply = await res.json();
      // console.log(reply);
      setCurrentPick(oldState=>{return {...oldState, addresses:reply.results}});
    }
  }
  // Requires for IonOption - when objects are used in selection
  const compareWith = (o1, o2) => {
    return o1 && o2 ? o1.address === o2.address : o1 === o2;
  };

  const resetMarkerAndCenter = (location) => {
    setLocation(location)
    center.lat = location.lat;
    center.lng = location.lng;
    setCurrentPick(oldPick=> {return {...oldPick, lat:location.lat, lng:location.lng}})
  }

  return (
    <>
      <IonPage id='main'>
        <IonHeader >
          <IonToolbar color="primary">
            <IonTitle slot="start">{pageTitle}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {loading && <div className="full-content">
            <IonSpinner name="lines" />
          </div>}
          {!loading && <div className="GeoMap">
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyBsqyN1XfESBdJHJL58hJOLeDPCZH6Y9Hg' }}
              // defaultCenter={center}
              center={{lat: center.lat, lng: center.lng}}
              defaultZoom={16}
              onClick={(event)=>{ 
                if(readOnly) return;
                setCurrentPick({...currentPick,lat:event.lat,lng:event.lng})
                getAddress(event.lat, event.lng, '');
                // addressList.open();
              }}
            >
              <Marker lng={currentPick.lng} lat={currentPick.lat} text={''}/>
            </GoogleMapReact>
          </div>}
          {!readOnly && <IonSearchbar 
              className='address' 
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  getAddress(currentPick.lat, currentPick.lng, address);
                  setAddress('');
                }
              }} 
              value={address}
              onIonChange={(event) => {
                setAddress(event.detail.value || '' )/* ;console.log(event); */
              }}
                   /* onIonInput={(e)=>console.log(e)} */ 
            />}

          {/* <IonItem className='geoAbs'>
            <IonLabel>
              <IonText>lat={currentPick.lat}</IonText>
              <IonText> lng={currentPick.lng}</IonText> 
              <IonText> Address: {currentPick.address}</IonText>
            </IonLabel>            
          </IonItem> */}
          {!readOnly && <><IonItem className='geoAbs'>
            <IonLabel>Address</IonLabel>
            <IonSelect 
              // ref = {addressList}
              value={location} 
              interface="action-sheet" 
              placeholder='Select from List' 
              compareWith = {compareWith}
              onIonChange={e => {/* console.log(e.detail.value) */;resetMarkerAndCenter(e.detail.value) }}>             
              {currentPick.addresses.map((result,i) => 
                  <IonSelectOption key={i}
                    value={{address:result.formatted_address, 
                            lat:result.geometry.location.lat, 
                            lng:result.geometry.location.lng}} >
                    {result.formatted_address}
                  </IonSelectOption>)}
            </IonSelect>
          </IonItem>
          </>
          }
          <IonFab vertical="center" horizontal="end">
            {!readOnly &&
              <IonFabButton size="small" onClick={getGeoLocation} >
                <IonIcon md={locateSharp} ios={locateOutline} />
              </IonFabButton>
            }
            <IonFabButton size="small" onClick={()=>{/* console.log(location) */; onClose(location)} }>
              <IonIcon md={arrowBackSharp} ios={arrowBackOutline} defaultValue="Done"/>
            </IonFabButton>
          </IonFab>
          {/* <IonButton onClick={getGeoLocation} className='geoFooter1'>Current Location</IonButton> */}
          {/* <IonButton onClick={()=>{console.log(location); onClose(location)}} className='geoFooter2'>Done</IonButton> */}
          
        </IonContent>
      </IonPage>
    </>
  )
}
export default MapView