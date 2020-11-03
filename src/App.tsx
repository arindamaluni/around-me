import { IonApp, IonLoading, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';
/* Application Imports */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext, useAuthInit } from './auth';
import Menu from './components/Menu';
import EventDetails from './pages/EventDetails';
import Events from './pages/Events';
import LoginPage from './pages/LoginPage';
import LogOutPage from './pages/LogOutPage';
import NewEvent from './pages/NewEvent';
import RegisterPage from './pages/RegisterPage';
import * as constants from './route-constants';
/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  const { loading, auth } =  useAuthInit();
  if (loading) {
    return <IonLoading isOpen />;
  }
  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path={constants.ROUTE_LOGIN} component={LoginPage} />
              <Route path={constants.ROUTE_LOGOUT} component={LogOutPage} />
              <Route path={constants.ROUTE_REGISTER} component={RegisterPage} />
              <Route path={constants.ROUTE_EVENT_PARAM} component={EventDetails} />
              <Route path={constants.ROUTE_EVENTS} component={Events} exact />
              <Route path={constants.ROUTE_NEWEVENT} component={NewEvent} exact/>             
              <Redirect from="/" to={constants.ROUTE_LOGIN} exact />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
