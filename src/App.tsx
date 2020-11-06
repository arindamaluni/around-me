import { IonApp, IonLoading, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
/* Application Imports */
import React from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import useAuthInit from './auth';
import EventListing from './components/EventListing/EventListing';
import Menu from './components/Menu';
/* Theme variables */
import './global.scss';
import EventDetails from './pages/EventDetails';
import Events from './pages/Events';
import LoginPage from './pages/LoginPage';
import LogOutPage from './pages/LogOutPage';
import NewEvent from './pages/NewEvent';
import RegisterPage from './pages/RegisterPage';
import * as constants from './route-constants';
import store from './store';





const App: React.FC = () => {
  const { loading } =  useAuthInit();
  if (loading) {
    return <IonLoading isOpen />;
  }
  return (
    <IonApp>
      {/* <AuthContext.Provider value={auth}> */}
      <Provider store={store}>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path={constants.ROUTE_LOGIN} component={LoginPage} />
              <Route path={constants.ROUTE_LOGOUT} component={LogOutPage} />
              <Route path={constants.ROUTE_REGISTER} component={RegisterPage} />
              <Route path={constants.ROUTE_EVENT_PARAM} component={EventDetails} />
              <Route path={constants.ROUTE_EVENTS} component={Events} exact />
              {/* <ProtectedRoute path={constants.ROUTE_EVENTS} component={Events} exact /> */}
              <Route path={constants.ROUTE_NEWEVENT} component={NewEvent} exact/>             
              <Route path={constants.ROUTE_EVENT_TEMP} component={EventListing} exact/>             

              <Redirect from="/" to={constants.ROUTE_LOGIN} exact />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      {/* </AuthContext.Provider> */}
      </Provider>
    </IonApp>
  );
};

export default App;
