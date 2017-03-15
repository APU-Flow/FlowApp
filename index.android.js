// index.android.js
// Flow

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text
} from 'react-native';

import NavDrawerAndroid from './components/nav-drawer.android';
import Settings from './scenes/settings';
import Meters from './scenes/meters';
import ChangeAccount from './scenes/change-account';
import Splash from './scenes/splash';
import Login from './scenes/login';
import Register from './scenes/register';
import Overview from './scenes/overview';

export default class FlowApp extends Component {

  constructor(props) {
    super(props);
    
    // Initialize state variables
    this.state = {
      drawerLockMode: 'locked-closed'
    };
  }

  render() {
    return (
      <Navigator
        initialRoute={{ name: 'splash' }}
        configureScene={(route) => route.sceneConfig || Navigator.SceneConfigs.FloatFromBottomAndroid}
        renderScene={(route, navigator) => {
          let scene = <Text>Bad route name given!</Text>;
          let drawerLock = 'unlocked';

          switch (route.name) {
            case 'splash':
              drawerLock = 'locked-closed';
              scene = <Splash pushRoute={navigator.push} />;
              break;
            case 'login':
              drawerLock = 'locked-closed';
              scene = <Login pushRoute={navigator.push} {...route.passProps} />;
              break;
            case 'register':
              drawerLock = 'locked-closed';
              scene = <Register pushRoute={navigator.push} {...route.passProps} />;
              break;
            case 'settings':
              scene = <Settings {...route.passsProps} />;
              break;
            case 'changeAccount':
              scene = <ChangeAccount {...route.passProps} />;
              break;
            case 'meters':
              scene = <Meters {...route.passProps} />;
              break;
            case 'overview':
              scene = <Overview {...route.passProps} />;
              break;
          }

          return (
            <NavDrawerAndroid
              drawerLockMode={drawerLock}
              pushRoute={navigator.push}
              currentRouteName={route.name}>

                {scene}

            </NavDrawerAndroid>
          );
        }}
      />
    );
  }
}

AppRegistry.registerComponent('FlowApp', () => FlowApp);
