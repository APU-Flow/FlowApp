/* Copyright 2017 Flow Team
 * Flow Team members at the time of this writing:
 * Ken Beard, Zach Clark, Jonathan Ming, Justin Rohweller, George Vine
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// index.android.js
// Flow

'use strict';

import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, AsyncStorage, Alert } from 'react-native';

import AddMeter from './scenes/add-meter';
import ChangeAccount from './scenes/change-account';
import Login from './scenes/login';
import Graphs from './scenes/graphs';
import Meters from './scenes/meters';
import Overview from './scenes/overview';
import Register from './scenes/register';
import Settings from './scenes/settings';
import Splash from './scenes/splash';
import NavDrawerAndroid from './components/nav-drawer.android';


export default class FlowApp extends Component {

  constructor(props) {
    super(props);

    // Initialize state variables
    this.state = {
      drawerLockMode: 'locked-closed',
      navigator: null,
      route: null
    };

    this.logout = this.logout.bind(this);
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
              scene = <Splash pushRoute={navigator.push}/>;
              break;
            case 'login':
              drawerLock = 'locked-closed';
              scene = <Login pushRoute={navigator.push}/>;
              break;
            case 'register':
              drawerLock = 'locked-closed';
              scene = <Register pushRoute={navigator.push}/>;
              break;
            case 'settings':
              scene = <Settings logout={() => this.logout(navigator)} {...route.passProps}/>;
              break;
            case 'changeAccount':
              scene = <ChangeAccount/>;
              break;
            case 'meters':
              scene = <Meters pushRoute={navigator.push} {...route.passProps}/>;
              break;
            case 'addMeter':
              scene = <AddMeter finishAction={() => navigator.pop()}/>;
              break;
            case 'overview':
              scene = <Overview {...route.passProps}/>;
              break;
            case 'graphs':
              drawerLock = 'locked-closed';
              scene = <Graphs {...route.passProps}/>;
              break;
          }

          return (
            <NavDrawerAndroid
              drawerLockMode={drawerLock}
              pushRoute={navigator.push}
              popRoute={navigator.pop}
              logout={() => this.logout(navigator)}
              currentRouteName={route.name}>

                {scene}

            </NavDrawerAndroid>
          );
        }}

      />
    );
  }


  logout(navigator) {
    AsyncStorage.multiRemove(['email', 'token', 'firstName'], (err) => {
      if (err) Alert.alert('Error', err.toString());

      navigator.resetTo({name: 'splash'});
    });
  }
}

AppRegistry.registerComponent('FlowApp', () => FlowApp);
