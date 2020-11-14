import {
  IonAvatar,

  IonButton,

  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem, IonLabel, IonPage, IonTextarea, IonTitle, IonToolbar
} from "@ionic/react";
import { arrowBackOutline, arrowBackSharp, sendOutline, sendSharp } from "ionicons/icons";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { firestore } from "../../firebase";


function Conversation ({event, onClose, authState}) {

  const [conv, setConv] = useState([]);
  const [message, setMessage] = useState('');

  useEffect (()=> {
    console.log(event.conversationId);
    const convRef = firestore.collection('conversations').doc(event.conversationId).collection('comments')
    convRef.orderBy('createdAt', 'desc').get().then(docs =>{    
        const convList =[];
        docs.forEach(doc => {convList.unshift( {id:doc.id, ...doc.data()})});
        setConv(convList);
    }).catch(err => {
      console.log(err);
    })
  }, [event]) 

  const postMessage = async (event, auhState) => {
    try {
      const entriesRef = firestore.collection('conversations').doc(event.conversationId).collection('comments')
      const entryData = getMessageEntry (event, auhState); 
      console.log(entryData);
      const entryRef = await entriesRef.add(entryData);
      console.log('saved:', entryRef.id);
    } catch (err) {
      console.log(err)
    }
    
  }

  const getMessageEntry = (event, authState) => {
    const { displayName, photoURL} =authState;

    return {
      displayName, photoURL, message, createdAt: new Date().getTime() 
    }

  }

  return (
    <IonPage>
        <IonHeader >
          <IonToolbar color="primary">
            <IonTitle slot="start">Discussions</IonTitle>
          </IonToolbar>
        </IonHeader>
      <IonContent fullscreen>
      {conv.map(comment => {
        return ( 
          <IonItem class="ion-justify-content-between" key={comment.id}>
            <IonAvatar slot="start">
              <img src={comment.photoURL} alt={comment.displayName?.charAt(0).toUpperCase()}/>
            </IonAvatar>   
            <IonLabel>
              <p>{comment.displayName}</p>
              <p style={{fontSize:"10px", color:"#FF0077"}}>Posted : {moment.utc(1605342597947).format('ll')}</p>
              <p>{comment.message}</p>
            </IonLabel>      
                {/* <div className="ion-float-left" style={{fontWeight:"bold"}}>
                  <h5>{comment.displayName} </h5>
                  {comment.createdAt && <p style={{fontSize:"10px", color:"#FF0077"}}>Posted : {moment.utc(1605342597947).format('ll')}</p> }
                </div>
                <div slot="end" style= {{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                  <IonLabel color="primary" class="ion-text-uppercase" ><div style={{ display:"inline-block", borderWidth:"2px", borderStyle:"solid", borderRadius:"4px", borderColor:"#FF0077", padding:"5px"}} > Available</div></IonLabel>       
                </div> */}
          </IonItem>
      )
      })}
      <IonFab vertical="center" horizontal="end">
        <IonFabButton size="small" onClick={()=>{onClose()} }>
          <IonIcon md={arrowBackSharp} ios={arrowBackOutline} defaultValue="Done" />
        </IonFabButton>
      </IonFab>

      <IonItem style={{position: "fixed", bottom: 50, width:"100%"}}>
        <IonTextarea value={message} onIonChange={(e) => setMessage(e.detail.value)}>
          <IonLabel>Comments</IonLabel>
        </IonTextarea>
        <IonButton onClick={() => {postMessage(event, authState); setMessage('')}}>
          <IonIcon md={sendSharp} ios={sendOutline} defaultValue="Done" />
        </IonButton>
      </IonItem>

      </IonContent>    
    </IonPage>
  );

}

const mapStateToProps = ({ authState }) => ({
  authState
});

export default connect( mapStateToProps )(Conversation);
