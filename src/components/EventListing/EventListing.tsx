import {
  IonAlert,
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonFooter,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal
} from "@ionic/react";
import {
  bookmarksOutline,
  bookmarksSharp,
  chatbubblesOutline,
  chatbubblesSharp,
  locationOutline,
  locationSharp,
  thumbsUpOutline,
  thumbsUpSharp,
  trashOutline,
  trashSharp
} from "ionicons/icons";
import moment from "moment";
import React, { useState } from "react";
import Conversation from "../Conversation/Conversation";
import MapView from "../LocationPicker/MapView";

function EventListing({
  eventList,
  authState,
  userProfile,
  toggleFavourite,
  discardOrWithdraw,
}) {
  const [showMap, setShowMap] = useState({ show: false, id: null });
  const [showConv, setShowConv] = useState({ show: false, id: null });
  const [showAlert, setShowAlert] = useState({ show: false, id: null });

  const getMapModal = (event) => {
    // if (event.id !== showMap.id) return;
    return (
      showMap && (
        <IonModal isOpen={showMap.show}>
          <MapView
            center={{
              lat: event.coordinates.latitude,
              lng: event.coordinates.longitude,
            }}
            onClose={() => setShowMap({ show: false, id: null })}
            pageTitle={"Venue location"}
            readOnly={true}
          />
        </IonModal>
      )
    );
  };

  const getConvModal = (event) => {
    return (
      showConv && (
        <IonModal isOpen={showConv.show}>
          <Conversation
            event={event}
            onClose={() => setShowConv({ show: false, id: null })}
          />
        </IonModal>
      )
    );
  };

  const ionAlert = (
    <IonAlert
      isOpen={showAlert.show}
      onDidDismiss={() => setShowAlert({ show: false, id: null })}
      cssClass="my-custom-class"
      header={"Invalidate Post"}
      message={
        "Your post will not be deleted but updated with a reason. Please select from following "
      }
      inputs={[
        {
          name: "Withdrawn",
          type: "radio",
          label: "Withdrawn",
          value: "withdrawn",
          checked: true,
        },
        {
          name: "Cancelled",
          type: "radio",
          label: "Cancelled",
          value: "cancelled",
        },
        {
          name: "Sold Out",
          type: "radio",
          label: "Sold Out",
          value: "sold",
        },
      ]}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (discardReason) => {
            console.log("Confirm Cancel", discardReason, showAlert);
          },
        },
        {
          text: "Ok",
          handler: (discardReason) => {
            if (discardReason) {
              console.log("Confirm Cancel", discardReason, showAlert);
              discardOrWithdraw(showAlert.id, discardReason);
            }
          },
        },
      ]}
    />
  );

  const handleEventDiscard = (event) => {
    if (event.publisherId !== userProfile.uid) discardOrWithdraw(event.id);
    else setShowAlert({ show: true, id: event.id });
  };

  return eventList.map((event) => {
    if (userProfile.discardedList.includes(event.id))
      return <div key={event.id}></div>;
    return (
      <IonCard color="light" style={{ padding: "5px" }} key={event.id}>
        <IonItem class="ion-justify-content-between">
          <IonAvatar slot="start">
            <img
              src={event.photoURL ? event.photoURL : "/assets/icon/user.png"}
              alt={event.displayName?.charAt(0).toUpperCase()}
            />
          </IonAvatar>
          <div className="ion-float-left" style={{ fontWeight: "bold" }}>
            <h5>{event.displayName} </h5>
            {event.createdAt && (
              <p style={{ fontSize: "10px", color: "#FF0077" }}>
                Posted : {moment.utc(1605342597947).format("ll")}
              </p>
            )}
          </div>
          <div
            slot="end"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IonLabel
              color={!event.availability ? "primary" : "medium"}
              class="ion-text-uppercase"
            >
              <div
                style={{
                  display: "inline-block",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderRadius: "4px",
                  borderColor: "#FF0077",
                  padding: "5px",
                }}
              >
                {!event.availability ? "available" : event.availability}
              </div>
            </IonLabel>
          </div>
        </IonItem>
        <div style={{ position: "relative" }}>
          <img src={event.pictureUrl} style={{ width: "100%" }} alt="" />
          <div
            style={{
              position: "absolute",
              bottom: "2px",
              backgroundColor: "#FF0077",
              opacity: "0.65",
              color: "white",
              width: "100%",
              textAlign: "center",
              padding: "3px",
              fontWeight: "bold",
            }}
          >
            {event.overlay}
          </div>
        </div>
        <IonCardHeader>
          <IonCardSubtitle>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  color: "#FF0077",
                  display: "inline",
                }}
              >
                {event.highlight}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  color: "#FF0077",
                  display: "inline",
                }}
              >
                {moment.utc(event.date).format("ll")}
              </span>
            </div>
          </IonCardSubtitle>
          <IonCardTitle>
            <div className="ion-text-center">
              <h2 style={{ fontWeight: "bold" }}>{event.title}</h2>
            </div>
          </IonCardTitle>
        </IonCardHeader>

        {event.externalLink && (
          <div
            style={{
              display: "flex",
              fontSize: "10px",
              color: "#FF0077",
              justifyContent: "center",
            }}
          >
            <a href={event.externalLink}>External Link</a>
          </div>
        )}
        <IonCardContent class="ion-text-center" style={{ fontSize: "13px" }}>
          {event.summary}
        </IonCardContent>
        <IonCardContent
          class="ion-text-center"
          style={{ fontSize: "15px", color: "#FF0077" }}
        >
          <IonIcon
            slot="end"
            md={locationSharp}
            ios={locationOutline}
            color="primary"
            size="large"
            onClick={() => setShowMap({ show: true, id: event.id })}
          />
          <p style={{ paddingLeft: "4px" }}>{event.venue}</p>
          <p
            style={{
              display: "inline-block",
              fontSize: "10px",
              fontWeight: "bold",
              backgroundColor: "#FF0077",
              color: "white",
              padding: "5px",
              borderRadius: "4px",
            }}
          >
            {(event.distance / 1000).toFixed(2)} Km.
          </p>
          <p>{event.address}</p>
        </IonCardContent>
        <IonFooter>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button style={{ backgroundColor: "transparent", outline: "none" }}>
              <IonIcon
                style={{ fontSize: "25px" }}
                color="primary"
                md={thumbsUpSharp}
                ios={thumbsUpOutline}
              />
              <div style={{ fontSize: "10px" }}> 4</div>
            </button>
            <button style={{ backgroundColor: "transparent", outline: "none" }}>
              <IonIcon
                style={{ fontSize: "25px" }}
                color="primary"
                md={chatbubblesSharp}
                ios={chatbubblesOutline}
                onClick={() => setShowConv({ show: true, id: event.id })}
              />
            </button>
            <button style={{ backgroundColor: "transparent", outline: "none" }}>
              <IonIcon
                style={{ fontSize: "25px" }}
                color={
                  userProfile.favList.includes(event.id) ? "medium" : "primary"
                }
                md={bookmarksSharp}
                ios={bookmarksOutline}
                onClick={() => toggleFavourite(event.id)}
              />
            </button>
            <button style={{ backgroundColor: "transparent", outline: "none" }}>
              <IonIcon
                style={{ fontSize: "25px" }}
                color="primary"
                md={trashSharp}
                ios={trashOutline}
                onClick={() => handleEventDiscard(event)}
              />
            </button>
          </div>
        </IonFooter>
        {/* Show the map only for the current selected card */}
        {event.id === showMap.id && getMapModal(event)}
        {event.id === showConv.id && getConvModal(event)}
        {ionAlert}
      </IonCard>
    );
  });
}

export default EventListing;
