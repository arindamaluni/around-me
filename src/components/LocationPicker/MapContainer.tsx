import { Capacitor, Plugins } from "@capacitor/core";
import { IonModal } from "@ionic/react";
import React, { useEffect, useState } from "react";
import LocationService from "../../utils/Location";
import HomeView from "./MapView";

const { Geolocation, Toast } = Plugins;

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

  useEffect (()=> {
    getGeoLocation();
  }, [])

  
  const getGeoLocation = async () => {
    const hasPermission = await LocationService.checkGPSPermission();
    if (hasPermission) {
      turnGPSOn()
    } else {
      const permission = await LocationService.requestGPSPermission();
      if (permission === "CAN_REQUEST" || permission === "GOT_PERMISSION") {
        turnGPSOn();
      } else {
        await Toast.show({
          text: "User denied location permission",
        });
      }
    }
  };

  const turnGPSOn = async () => {
    if (Capacitor.isNative) {
      const canUseGPS = await LocationService.askToTurnOnGPS();
      postGPSPermission(canUseGPS);
    } else {
      postGPSPermission(true);
    }
  }

  const postGPSPermission = async (canUseGPS: boolean) => {
    if (canUseGPS) {
      watchPosition();
    } else {
      await Toast.show({
        text: "Please turn on GPS to get location",
      });
    }
  };

  const watchPosition = async () => {
    try {
      setState({
        ...state, loading: true,
      });
      const watchId = Geolocation.watchPosition({}, (position, err) => {
        if (err) {
          return;
        }
        setState(
          { ...state,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            loading: false,
          }
        );
        console.log('Received current Location:', state.center)
        // Stop GPS after some interval
        setTimeout(()=>clearWatch(watchId), 2000)
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  const clearWatch = (watchId)=> {
    if (watchId != null) {
      Geolocation.clearWatch({ id: watchId });
    }
    setState((oldState)=>{return {...oldState,loading: false}});
  }



  const onClose = (location) => {
    console.log("MapContainer:onClose -> location", location)
    console.log(location);
    props.saveLocation(location);
    // clearWatch(state.watchId);
  }

  const { center, loading, address } = state;
    
    
  return (
    <IonModal isOpen={props.isOpen}>
      <HomeView
        center={center}
        getGeoLocation={getGeoLocation}
        loading={loading}
        address={address}
        onClose = {onClose}
      />
    </IonModal>
  );
  
}

export default MapContainer;
