import { Capacitor, Geolocation } from "@capacitor/core";
import LocationService from "./Location";

export  const getGeoLocation = async (setState, asyncToastCallback, dispatcher=null) => {

  const clearWatch = (watchId)=> {
    if (watchId != null) {
      Geolocation.clearWatch({ id: watchId });
    }
    if (!dispatcher) 
      setState((oldState)=>{return {...oldState,loading: false}});
  }
  
  const watchPosition = async () => {
    try {
      
      if (dispatcher) dispatcher({latitude:0, longitude:0, loading:true})
      else setState((oldState)=>{return {...oldState, loading: true}});
      const watchId = Geolocation.watchPosition({}, (position, err) => {
        if (err) {
          return;
        }
        if (dispatcher) dispatcher({latitude:position.coords.latitude, 
                longitude:position.coords.longitude, loading:false})
        else setState((oldState)=>{return {...oldState, center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        loading: false,}});
        // console.log('Received current Location:', state.center)
        // Stop GPS after some interval
        setTimeout(()=>clearWatch(watchId), 2000)
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  const postGPSPermission = async (canUseGPS: boolean) => {
    if (canUseGPS) {
      watchPosition();
    } else {
      asyncToastCallback("Please turn on GPS to get location");
      // await Toast.show({
      //   text: "Please turn on GPS to get location",
      // });
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

  const hasPermission = await LocationService.checkGPSPermission();
  if (hasPermission) {
    turnGPSOn()
  } else {
    const permission = await LocationService.requestGPSPermission();
    if (permission === "CAN_REQUEST" || permission === "GOT_PERMISSION") {
      turnGPSOn();
    } else {
      asyncToastCallback("User denied location permission")
      // await Toast.show({
      //   text: "User denied location permission",
      // });
    }
  }

};