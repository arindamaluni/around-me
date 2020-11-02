import moment from 'moment';
import React from 'react';
import './EventItemHeader.css';

function EventItemHeader({event}) {
  
  return (
    <div className="header-card">
      {/* {console.log(event)} */}
      <span className="header-next-event">NEXT EVENT</span>
      <div className="header-time-section">{moment(event.date).format('Do MMM')}</div> 
      <div className="header-title">{event.title}</div>
      <div className="header-time">{moment(event.date).format('LLL')}</div>
      <div className="header-venue">{event.venue}</div>
      
    </div>
  )
  }

export default EventItemHeader;