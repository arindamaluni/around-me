import moment from 'moment';
import React from 'react';
import './EventItem.css';

function EventItem({event}) {
  return (
    <div className="card">
      <div className="time-section">{moment(event.date).format('Do MMM')}</div>
      <div className="title-section">
        <div className="titlle"><h2>{event.title}</h2></div>
        <div className="time">{moment(event.date).format('LLL')}</div>
        <div className="venue">{event.venue}</div>
      </div>
    </div>
    );
  }
export default EventItem;