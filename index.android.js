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
import Settings from './scenes/settings';
import ChangeAccount from './scenes/change-account';
import Meters from './scenes/meters';

export default class FlowApp extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Flow', index: 1 }} //changed index to 1
        renderScene={(route, navigator) => {
          if (route.index === 0) { 
            return (
              <Splash 
                title={route.title}

                // Function that's called to load login scene
                loadNextScene={ () => navigator.push({ title: 'Log In', index: route.index + 1 }) }
              />
            );
          } else {
            return <Meters />
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
    backgroundColor: '#0000FF',
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
