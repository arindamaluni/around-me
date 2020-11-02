import React from 'react';
import EventItem from '../EventItem/EventItem';
import EventItemHeader from '../EventItemHeader/EventItemHeader';
import list from './dummylist';
import './EventList.css';

function EventList({eventList}) {
  eventList = eventList || list;
  const firstEvent = eventList[0];
  const otherEvents = eventList.slice(1);
  return (
    <> 
    {/* {console.log(eventList.length, firstEvent)} */}

    <EventItemHeader  event={firstEvent} />
    {otherEvents.map(event => {
      return <EventItem key={event._id} event={event}/>
    })}
    </> 
    );
  }
export default EventList;
