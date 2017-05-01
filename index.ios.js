// index.ios.js
// Flow
'use strict';

import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, AsyncStorage, Alert} from 'react-native';

import AddMeter from './scenes/add-meter';
import ChangeAccount from './scenes/change-account';
import Login from './scenes/login';
import Graphs from './scenes/graphs';
import Meters from './scenes/meters';
import Overview from './scenes/overview';
import Register from './scenes/register';
import Settings from './scenes/settings';
import Splash from './scenes/splash';
import NavBarIOS from './components/nav-bar.ios';


export default class FlowApp extends Component {

  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  render() {
    return (
      <Navigator
        initialRoute={{ name: 'splash' }}
        configureScene={(route) => route.sceneConfig || Navigator.SceneConfigs.FloatFromBottom}
        renderScene={(route, navigator) => {
          let scene = <Text>Bad route name given!</Text>;

          switch (route.name) {
            case 'splash':
              return <Splash pushRoute={navigator.push}/>;
            case 'login':
              return <Login pushRoute={navigator.push}/>;
            case 'register':
              return <Register pushRoute={navigator.push}/>;
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
              scene = <Graphs {...route.passProps}/>;
              break;
          }

          return (
            <NavBarIOS
              selectedTab={route.name}
              pushRoute={navigator.push}
              logout={() => this.logout(navigator)}>

                {scene}

            </NavBarIOS>
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
