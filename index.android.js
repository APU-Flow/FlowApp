// index.android.js
// Flow

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator
} from 'react-native';

import Settings from './scenes/settings';
import Meters from './scenes/meters';
import ChangeAccount from './scenes/change-account';
import Splash from './scenes/splash';
import Login from './scenes/login';
import Register from './scenes/register';
import Overview from './scenes/overview';

export default class FlowApp extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ name: 'splash' }}
        configureScene={(route) => route.sceneConfig || Navigator.SceneConfigs.FloatFromBottomAndroid}
        renderScene={(route, navigator) => {
          switch (route.name) {
            case 'splash':
              return <Splash navigator={navigator} />;
            case 'login':
              return <Login {...route.passProps} />;
            case 'register':
              return <Register {...route.passProps} />;
            case 'settings':
              return <Settings {...route.passsProps} />;
            case 'changeAccount':
              return <ChangeAccount {...route.passProps} />;
            case 'meters':
              return <Meters {...route.passProps} />;
            case 'overview':
              return <Overview navigator={navigator} {...route.passProps} />;
            default:
              return <Text>Bad route name given!</Text>
          }
        }}
      />
    );
  }
}

AppRegistry.registerComponent('FlowApp', () => FlowApp);
