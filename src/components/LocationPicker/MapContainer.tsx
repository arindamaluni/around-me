import {Plugins} from '@capacitor/core';
import {IonModal} from '@ionic/react';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {getGeoLocation} from '../../utils/GetGeoLocation';
import MapView from './MapView';

const {Toast} = Plugins;

const MapContainer = props => {
  const {latitude, longitude} = props.location;
  const [state, setState] = useState({
    center: {
      lat: latitude,
      lng: longitude,
    },
    latitude: latitude,
    longitude: longitude,
    loading: false,
    address: '',
  });

  const toastHandler = async message => {
    console.log(message);
    await Toast.show({text: message});
  };

  // useEffect (()=> {
  //   getGeoLocation(setState, toastHandler);
  // }, [])

  const onClose = location => {
    console.log('MapContainer:onClose -> location', location);
    console.log(location);
    props.saveLocation(location);
  };

  const {center, loading, address} = state;

  return (
    <IonModal isOpen={props.isOpen}>
      <MapView
        center={center}
        getGeoLocation={() => getGeoLocation(setState, toastHandler)}
        loading={loading}
        address={address}
        onClose={onClose}
        pageTitle={'Select location'}
      />
    </IonModal>
  );
};

const mapStateToProps = ({authState, events, location}) => ({
  authState,
  events,
  location,
});

export default connect(mapStateToProps)(MapContainer);
