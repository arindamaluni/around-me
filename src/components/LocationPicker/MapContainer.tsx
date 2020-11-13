import { Plugins } from "@capacitor/core";
import { IonModal } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { getGeoLocation } from '../../utils/GetGeoLocation';
import MapView from "./MapView";

const { Toast } = Plugins;

const MapContainer = (props) => {
  const [state, setState] = useState(
  {
    center: {
      lat: 12.934485599999999,
      lng: 77.6192336,
    },
    latitude: 12.934485599999999,
    longitude: 77.6192336,
    loading: false,
    address: "",
  });

  const toastHandler = async (message) => {
    console.log(message);
    await Toast.show({text: message });
  }

  useEffect (()=> {
    getGeoLocation(setState, toastHandler);
  }, [])

  const onClose = (location) => {
    console.log("MapContainer:onClose -> location", location)
    console.log(location);
    props.saveLocation(location);
  }

  const { center, loading, address } = state;
    
    
  return (
    <IonModal isOpen={props.isOpen}>
      <MapView
        center={center}
        getGeoLocation={()=>getGeoLocation(setState, toastHandler)}
        loading={loading}
        address={address}
        onClose = {onClose}
      />
    </IonModal>
  );
  
}

export default MapContainer;
