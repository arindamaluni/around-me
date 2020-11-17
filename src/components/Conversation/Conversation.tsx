import {
  IonAvatar,
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  arrowBackOutline,
  arrowBackSharp,
  sendOutline,
  sendSharp,
} from 'ionicons/icons';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {firestore} from '../../firebase';

function Conversation({event, onClose, authState}) {
  const [conv, setConv] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log(event.conversationId);
    const convRef = firestore
      .collection('conversations')
      .doc(event.conversationId)
      .collection('comments');
    convRef
      .orderBy('createdAt', 'desc')
      .get()
      .then(docs => {
        const convList = [];
        docs.forEach(doc => {
          convList.unshift({id: doc.id, ...doc.data()});
        });
        setConv(convList);
      })
      .catch(err => {
        console.log(err);
      });
  }, [event]);

  const postMessage = async (event, auhState) => {
    try {
      const entriesRef = firestore
        .collection('conversations')
        .doc(event.conversationId)
        .collection('comments');
      const entryData = getMessageEntry(event, auhState);
      console.log(entryData);
      const entryRef = await entriesRef.add(entryData);
      const msg = {id: entryRef.id, ...entryData};
      console.log('saved:', msg);
      setConv([...conv, msg]);
    } catch (err) {
      console.log(err);
    }
  };

  const getMessageEntry = (event, authState) => {
    const {displayName, photoURL} = authState;

    return {
      displayName,
      photoURL,
      message,
      createdAt: new Date().getTime(),
    };
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle slot="start">Discussions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{position: 'relative'}}>
        {conv.map(comment => {
          return (
            <IonItem class="ion-justify-content-between" key={comment.id}>
              <IonAvatar slot="start">
                <img
                  style={{width: '80%', height: 'auto'}}
                  src={
                    comment.photoURL
                      ? comment.photoURL
                      : '/assets/icon/user.png'
                  }
                  alt={comment.displayName?.charAt(0).toUpperCase()}
                />
              </IonAvatar>
              <IonLabel>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0px',
                    margin: '0px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '10px',
                      fontWeight: 'bold',
                      padding: '0px',
                      margin: '0px',
                    }}
                  >
                    {comment.displayName}
                  </p>
                  <p
                    style={{
                      fontSize: '10px',
                      color: '#FF0077',
                      fontWeight: 'bold',
                      padding: '0px',
                      margin: '0px',
                    }}
                  >
                    {moment.utc(comment.createdAt).format('lll')}
                  </p>
                </div>
                <p style={{fontSize: '12px'}}>{comment.message}</p>
              </IonLabel>
            </IonItem>
          );
        })}
        <IonFab vertical="center" horizontal="end">
          <IonFabButton
            size="small"
            onClick={() => {
              onClose();
            }}
          >
            <IonIcon
              md={arrowBackSharp}
              ios={arrowBackOutline}
              defaultValue="Done"
            />
          </IonFabButton>
        </IonFab>
      </IonContent>
      <IonFooter>
        <IonItem
          style={{position: 'fixed', bottom: 0, width: '100%', zIndex: 100}}
        >
          <IonTextarea
            style={{backgroundColor: 'secondary'}}
            value={message}
            placeholder="Post your message here"
            color="primary"
            onIonChange={e => setMessage(e.detail.value)}
          >
            <IonLabel position="floating">Comments</IonLabel>
          </IonTextarea>
          <IonButton
            onClick={() => {
              postMessage(event, authState);
              setMessage('');
            }}
          >
            Post Message{' '}
            <IonIcon
              slot="end"
              ion-padding
              md={sendSharp}
              ios={sendOutline}
              defaultValue="Done"
            />
          </IonButton>
        </IonItem>
      </IonFooter>
    </IonPage>
  );
}

const mapStateToProps = ({authState}) => ({
  authState,
});

export default connect(mapStateToProps)(Conversation);
