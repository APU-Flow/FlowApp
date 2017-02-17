// index.ios.js
// Flow

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator
} from 'react-native';

import Splash from './scenes/splash';
import Login from './scenes/login';
import Register from './scenes/register';
import Overview from './scenes/overview';

export default class FlowApp extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Flow', name: 'splash' }}
        renderScene={(route, navigator) => {
          switch (route.name) {
            case 'splash':
              return <Splash navigator={navigator} />;
            case 'login':
              return <Login {...route.passProps} />;
            case 'register':
              return <Register {...route.passProps} />;
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('FlowApp', () => FlowApp);
