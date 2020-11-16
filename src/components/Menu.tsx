import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote
} from '@ionic/react';
import { bookmarksOutline, bookmarksSharp, calendarClearOutline, calendarClearSharp, calendarOutline, calendarSharp, logInOutline, logInSharp, logOutOutline, logOutSharp } from 'ionicons/icons';
import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ROUTE_BOOKMARKED, ROUTE_EVENTS, ROUTE_LOGIN, ROUTE_LOGOUT, ROUTE_NEWEVENT } from '../route-constants';
import './Menu.css';


interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  displayWhileLoggedIn: boolean;
}

const appPages: AppPage[] = [
  {
    title: 'New Event',
    url: ROUTE_NEWEVENT,
    iosIcon: calendarClearOutline,
    mdIcon: calendarClearSharp,
    displayWhileLoggedIn: true
  },
  {
    title: 'Current Events',
    url: ROUTE_EVENTS,
    iosIcon: calendarOutline,
    mdIcon: calendarSharp,
    displayWhileLoggedIn: true
  },

  // {
  //   title: 'Test Events',
  //   url: ROUTE_EVENT_TEMP,
  //   iosIcon: calendarOutline,
  //   mdIcon: calendarSharp,
  //   displayWhileLoggedIn: true
  // },
  
  
];

const loginPages: AppPage[] = [
  {
    title: 'Log In',
    url: ROUTE_LOGIN,
    iosIcon: logInOutline,
    mdIcon: logInSharp,
    displayWhileLoggedIn: false
  },
  {
    title: 'Log Out',
    url: ROUTE_LOGOUT,
    iosIcon: logOutOutline,
    mdIcon: logOutSharp,
    displayWhileLoggedIn: true
  }, 
  {
    title: 'Bookmarked',
    url: ROUTE_BOOKMARKED, 
    iosIcon: bookmarksOutline,
    mdIcon: bookmarksSharp,
    displayWhileLoggedIn: true
  },
]

// const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

function getMenuItem (appPage, index, location, loggedIn) {
  return (
    (loggedIn === appPage.displayWhileLoggedIn) &&
    <IonMenuToggle key={index} autoHide={false}>
      <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
        <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
        <IonLabel>{appPage.title}</IonLabel>
      </IonItem>
    </IonMenuToggle>
  );
}

const Menu = (props) => {
  const location = useLocation();
  const { loggedIn } = props.authState;

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Links</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => getMenuItem (appPage, index, location, loggedIn))}
        </IonList>
        <IonList id="login-list">

        {loginPages.map((loginPage, index) => getMenuItem (loginPage, index, location, loggedIn))}
        </IonList>
        {/* <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList> */}
      </IonContent>
    </IonMenu>
  );
};


const mapStateToProps = ({ authState }) => ({
  authState
});

export default connect( mapStateToProps )(Menu);
