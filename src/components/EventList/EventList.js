import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonNote } from '@ionic/react';
import { archive, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import moment from 'moment';
import React from 'react';
import { ROUTE_EVENT_PATH } from '../../route-constants';
import list from './dummylist';
import './EventList.css';


function EventList({eventList}) {
  
  eventList = eventList.length? eventList :list;

  return (
    <>
      {eventList.map(event => {
        // return <EventItem key={event._id} event={event}/>
        return ( 
      <IonItemSliding key={event.id}>
        <IonItem href={`${ROUTE_EVENT_PATH}${event.id}`} key={event.id}>
          <IonLabel>
            <h2>{event.title}</h2>
            <p>{moment.utc(event.date).format('LLLL')}</p>
            <p>{event.venue}</p>
          </IonLabel>
          <IonNote slot="end">
            <p>{moment.utc(event.date).format('LT')}</p>
          </IonNote>
          <IonItemOptions>
            <IonItemOption color="primary">
              <IonIcon slot="end" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
              More
            </IonItemOption>
            <IonItemOption color="secondary">
              <IonIcon slot="end" icon={archive} />
              Archive
            </IonItemOption>
          </IonItemOptions>
        </IonItem>
      </IonItemSliding>
      )
      })}
    </>
    );
  }
export default EventList;
