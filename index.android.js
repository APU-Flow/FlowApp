// index.android.js
// Flow

import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, AsyncStorage, Alert } from 'react-native';

import MeterGraphs from './scenes/meter-graphs';
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

    this.logout = this.logout.bind(this);
  }

  render() {
    return (
      <Navigator
        initialRoute={{ name: 'meterGraphs' }}
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
              scene = <Settings logout={this.logout} {...route.passsProps} />;
              break;
            case 'changeAccount':
              scene = <ChangeAccount {...route.passProps} />;
              break;
            case 'meters':
              scene = <Meters pushRoute={navigator.push} {...route.passProps} />;
              break;
            case 'overview':
              scene = <Overview {...route.passProps} />;
              break;
            case 'meterGraphs':
              drawerLock = 'locked-closed';
              scene = <MeterGraphs {...route.passProps} />;
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


  logout() {
    AsyncStorage.multiRemove(['email', 'token'], (err) => {
      if (err) Alert.alert('Error', err);

      navigator.resetTo('splash');
    });
  }
}

AppRegistry.registerComponent('FlowApp', () => FlowApp);
