// index.android.js
// Flow

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator
} from 'react-native';

import Splash from './scenes/splash';
import Login from './scenes/login/login';
import Overview from './scenes/overview';

export default class FlowApp extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Flow', index: 0 }}
        renderScene={(route, navigator) => {
          switch (route.index) {
            case 0: 
              return <Splash
                title={route.title}

                // Function that's called to load login scene
                loadNextScene={ () => navigator.push({ index: 1 }) }
              />;
            case 1:
              return <Login
                loadOverviewScene={ () => navigator.push({ index: 3 }) }
                loadRegisterScene={ () => navigator.push({ index: 2 }) }
              />;
            case 2:
              return <Register loadOverviewScene={ () => navigator.push({ index: 3 }) } />;
            default:
              return <Overview />
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
