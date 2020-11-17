import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {firestore} from '../firebase';
import {EventItem} from '../types';
// import { saveOrUpdateEvent } from '../utils/EventDBHandler';
// import { saveOrUpdateProfile } from '../utils/ProfileDBHandler';
import Events from './Events';

const MyPosts = props => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    // Get posts by the user
    if (!props.authState.uid) return;
    console.log(props.authState.uid);
    const entriesRef = firestore.collection('events');
    let events = [];
    entriesRef
      //Requires composite index so sorted locally
      //.orderBy('createdAt', 'desc')
      .where('publisherId', '==', props.authState.uid)
      .get()
      .then(({docs}) => {
        events = docs
          .map(EventItem.toEventItem)
          .sort((a, b) => a.createdAt - b.createdAt);
        setMyPosts(events);
        console.log('Fetching my posts', myPosts);
      });
  }, [props.authState.uid]);

  return (
    <>
      {console.log(myPosts)}
      {myPosts.length && (
        <Events
          {...props}
          mode={'myposts'}
          posts={myPosts}
          pageTitle={'My Posts'}
        />
      )}
    </>
  );
};

const mapStateToProps = ({authState}) => ({
  authState,
});

export default connect(mapStateToProps)(MyPosts);
