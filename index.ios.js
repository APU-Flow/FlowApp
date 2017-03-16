// index.ios.js
// Flow

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text
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
        configureScene={(route) => route.sceneConfig || Navigator.SceneConfigs.FloatFromBottom}
        renderScene={(route, navigator) => {
          let scene = <Text>Bad route name given!</Text>;

          switch (route.name) {
            case 'splash':
              scene = <Splash pushRoute={navigator.push} />;
              break;
            case 'login':
              scene = <Login pushRoute={navigator.push} {...route.passProps} />;
              break;
            case 'register':
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

          return scene;
        }}
      />
    );
  }
}

AppRegistry.registerComponent('FlowApp', () => FlowApp);
