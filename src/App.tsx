// import { Toast } from '@capacitor/core';
import {Toast} from '@capacitor/core';
import {IonApp, IonLoading, IonRouterOutlet, IonSplitPane} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
/* Application Imports */
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import {default as useAuthInit} from './auth';
import Menu from './components/Menu';
/* Theme variables */
import './global.scss';
import Events from './pages/Events';
import LoginPage from './pages/LoginPage';
import LogOutPage from './pages/LogOutPage';
import MyPosts from './pages/MyPosts';
import NewEvent from './pages/NewEvent';
import RegisterPage from './pages/RegisterPage';
import * as constants from './route-constants';
import store from './store';
import setLocationAction from './store/action-creators/location-actions';
import {getGeoLocation} from './utils/GetGeoLocation';

const App: React.FC = () => {
  const {loading} = useAuthInit();
  // useLocationInit();//Why the hell hook does not work
  const toastHandler = async message => {
    await Toast.show({text: message});
  };
  const locationDispatcher = payload => {
    console.log(payload);
    store.dispatch(setLocationAction(payload));
  };
  useEffect(() => {
    console.log('Getting Geolocation');
    getGeoLocation(null, toastHandler, locationDispatcher);
  }, []);

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
              <Route path={constants.ROUTE_EVENTS} component={Events} exact />
              <Route path={constants.ROUTE_MYPOSTS} component={MyPosts} exact />
              {/* <ProtectedRoute path={constants.ROUTE_EVENTS} component={Events} exact /> */}
              <Route
                path={constants.ROUTE_NEWEVENT}
                component={NewEvent}
                exact
              />
              <Route
                path={constants.ROUTE_BOOKMARKED}
                exact
                render={props => (
                  <Events
                    {...props}
                    mode={'favourite'}
                    pageTitle={'My Bookmarks'}
                  />
                )}
              />
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
