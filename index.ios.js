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
      <Overview/>
    );
  }
}

AppRegistry.registerComponent('FlowApp', () => FlowApp);
