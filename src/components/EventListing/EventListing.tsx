// import { IonItemSliding } from '@ionic/react';
// import React from 'react';
// // import list from './dummylist';
// import './EventList.css';

// import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import {
  IonAvatar,
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid,
  IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonRow, IonText, IonTitle, IonToolbar
} from "@ionic/react";
import { pin, text, thumbsUp, time, walk, warning, wifi, wine } from 'ionicons/icons';
import React from "react";
import { connect } from "react-redux";
import './event-listing.scss';

function EventListing({events}) {

  console.log('Rendering New Item')
  return (

    // <>
    // <IonHeader>
    //   <IonToolbar color="primary">
    //     <IonButtons slot="start">
    //       <IonBackButton defaultHref="app/categories"></IonBackButton>
    //     </IonButtons>
    //     <IonTitle>Deals Listing</IonTitle>
    //   </IonToolbar>
    // </IonHeader> 
    
    // <IonContent className="deals-listing-content">
    //   {/* <ng-container *ngIf="listing?.items"> */}
    //     <div className="listing-item"> 
    //       <IonRow className="top-row">
    //         <IonCol className="logo-col" size="6">
    //           <img src="./assets/deals/Deals1-4.1.png" alt="Logo"/>
    //         </IonCol>
    //         <IonCol  className="call-to-actIonCol">
    //           <IonButton className="claim-button" expand="block" color="claim" >
    //             <span className="button-cta">CLAIM</span>
    //             <IonIcon slot="end" name="arrow-forward"></IonIcon>
    //           </IonButton>
    //         </IonCol>
    //         <IonCol  className="call-to-actIonCol">
    //           <span className="expired-cta">EXPIRED</span>
    //         </IonCol>
    //       </IonRow>
    //       <IonRow className="middle-row">
    //         <IonCol className="info-col">
    //           <h4 className="item-name">
    //             <a className="name-anchor" href="`${}`">
    //             </a>
    //           </h4>
    //           <p className="item-description">
    //           </p>
    //         </IonCol>
    //         <IonCol size="2">
    //           <IonButton className="bookmark-button" expand="block" fill="clear" color="claim">
    //             <IonIcon slot="icon-only" name="pricetag"></IonIcon>
    //           </IonButton>
    //         </IonCol>
    //       </IonRow>
    //       <IonRow className="bottom-row">
    //         <IonCol className="code-wrapper">
    //           <span className="code-cta">Use this code:</span>
    //           <span className="item-code" >
    //           </span>
    //         </IonCol>
    //         <IonCol className="time-left-wrapper" size="5">
    //           <span className="expiration-cta">DEAL Expires/expired</span>
    //             <span className="item-time-left">
    //             </span>
    //             <IonRow className="countdown-wrapper"> 
    //               <div>Timer</div> 
    //             </IonRow>
    //         </IonCol>
    //       </IonRow>
    //     </div>

    // </IonContent>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CardExamples</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent ion-padding>
        <IonCard color="light">
          <IonItem class="ion-justify-content-between">
            <IonAvatar slot="start">
              <img src="../../assets/user.jpg" alt=""/>
            </IonAvatar>         
              {/* <IonItem > style={{display:"flex", justifyContent:"spaceBetween"}} style={{borderWidth:"thin", borderStyle:"solid", borderRadius:"2px", borderColor:"primary", padding:"5px"}} */}
                {/* <IonRow class="ion-justify-content-between">
                <IonCol size="6"> */}
                <div className="ion-float-left" style={{fontWeight:"bold"}}>
                  <h5>John Doe</h5>
                  <p style={{fontSize:"10px", color:"#FF0077"}}> Dec 10, 2019</p>
                </div>
                {/* </IonCol > */}
                {/* <IonButton fill="outline" slot="end">View</IonButton> */}
                {/* <IonCol size="6" class="ion-float-right"> */}
                <IonLabel slot="end" color="primary" class="ion-text-uppercase ion-text-end ion-padding " ><div style={{ display:"inline-block", borderWidth:"2px", borderStyle:"solid", borderRadius:"4px", borderColor:"#FF0077", padding:"5px"}} > Available</div></IonLabel>
                {/* </IonCol>
                </IonRow> */}
              {/* </IonItem> */}

          </IonItem>
          <div style={{position:"relative"}}>      
            <img src="./assets/deals/Deal-Details-showcase-2.jpg" style={{width: "100%"}} alt="ion" />
            <div style={{position:"absolute", bottom:"2px", backgroundColor:"#FF0077", opacity:"0.65", color:"white", width: "100%", textAlign:"center", padding:"3px",  fontWeight:"bold"}}>Overlay Text</div>
          </div>
          <IonCardHeader>
            <IonCardSubtitle>
              <div style={{display: "flex", flexDirection:"row", justifyContent:"space-between", width: "100%"}}>
                <span style={{fontSize:"14px", color:"#FF0077", display: "inline"}}>Exclusive Offer</span>
                <span style={{fontSize:"14px", color:"#FF0077", display: "inline"}}>Valid Till: Dec 10, 2019</span>
              </div>
            </IonCardSubtitle>
            <IonCardTitle ><div className = "ion-text-center" ><h2 style={{fontWeight: "bold"}}>30% off on Lindt on a purchase of 3</h2></div></IonCardTitle>
            
          </IonCardHeader>
          <IonCardContent class="ion-text-center" style={{fontSize:"13px"}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis mollis ligula sed ultrices.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis mollis ligula sed ultrices.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis mollis ligula sed ultrices.
          </IonCardContent>
          <br></br>
          <IonItem class="ion-text-center" style={{fontSize:"15px", color:"#FF0077", backgroundColor:"white",paddingBottom:"3px"}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis mollis ligula sed ultrices.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis mollis ligula sed ultrices.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis mollis ligula sed ultrices.
          </IonItem>

          <IonFooter>
            <div style={{display:"flex", justifyContent:"space-around"}}>
              <button style={{backgroundColor:"transparent", outline:"none"}}>
                <IonIcon style={{fontSize:"20px"}} color="primary" icon={thumbsUp}></IonIcon>
                <div style={{fontSize:"10px"}}> 4</div>
              </button>
              <button>
                <IonIcon icon={text}></IonIcon>
                <div>4 Comments</div>
              </button>
              <button>
                <IonIcon icon={time}></IonIcon>
                <div>11h ago</div>
              </button>
            </div>
           {/*  <IonRow>
              <IonCol  text-center>
                <button>
                  <IonIcon icon={thumbsUp}></IonIcon>
                  <div>1.5k Likes</div>
                </button>
              </IonCol>
              <IonCol  text-center>
                <button>
                  <IonIcon icon={text}></IonIcon>
                  <div>4 Comments</div>
                </button>
              </IonCol>
              <IonCol  text-center>
                <button>
                  <IonIcon icon={time}></IonIcon>
                  <div>11h ago</div>
                </button>
              </IonCol>
            </IonRow> */}
          </IonFooter>

          </IonCard>
        <IonGrid>
          <IonCol size-md="6" offset-md="3" class="ion-text-center">
            <IonRow>
              <IonCard color="light"> 
                <IonCardHeader>
                  <IonCardSubtitle>Exclusive Offer</IonCardSubtitle>
                  <IonCardTitle ><div className = "ion-text-center" ><h2>30% off on Lindt on a purchase of 3</h2></div></IonCardTitle>         
                </IonCardHeader>
                <IonCardContent >
                  <div className = "ion-text-center" style={{display:"flex", position:"relative"}}>
                    <span style={{backgroundColor:"coral", opacity:0.5, justifyContent:"center", width:"100%", position:"absolute"}}><p >Some writing</p></span>
                    <IonImg src="./assets/deals/Deal-Details-showcase-2.jpg"> </IonImg>
                    <h3 style={{margin:20, fontWeight:"bold"}}>Lindt Excellence 70% Cocoa chocolate Diamonds 200gm bar for $6 for a pack of three. Offer till stocks last.</h3>
                  </div>
                </IonCardContent>
                <IonRow>
                  <IonCol size-md="4" offset="1"><IonText><p className = "ion-text-center">Some Text Content</p></IonText> </IonCol>
                  <IonCol size-md="4" offset="1"><IonText><p className = "ion-text-center">Some other Content</p></IonText> </IonCol>
                </IonRow>

              </IonCard>
            </IonRow>
              <IonCard>
                <IonItem>
                  <IonIcon icon={pin} slot="start" />
                  <IonLabel>ion-item in a card, icon left, button right</IonLabel>
                  <IonButton fill="outline" slot="end">View</IonButton>
                </IonItem>

                <IonCardContent>
                  This is content, without any paragraph or header tags,
                  within an IonCardContent element.
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonItem href="#" className="ion-activated">
                  <IonIcon icon={wifi} slot="start" />
                  <IonLabel>Card Link Item 1 activated</IonLabel>
                </IonItem>

                <IonItem href="#">
                  <IonIcon icon={wine} slot="start" />
                  <IonLabel>Card Link Item 2</IonLabel>
                </IonItem>

                <IonItem className="ion-activated">
                  <IonIcon icon={warning} slot="start" />
                  <IonLabel>Card Button Item 1 activated</IonLabel>
                </IonItem>

                <IonItem>
                  <IonIcon icon={walk} slot="start" />
                  <IonLabel>Card Button Item 2</IonLabel>
                </IonItem>
              </IonCard>
            </IonCol>
        </IonGrid>
  
        
 
      </IonContent>

      

    </IonPage>


    );
  }

const mapStateToProps = ({ authState, events }) => ({
  authState, events
});

export default connect( mapStateToProps )(EventListing);
