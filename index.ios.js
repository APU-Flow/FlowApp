// index.ios.js
// Flow

import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, AsyncStorage, Alert } from 'react-native';

import AddMeter from './scenes/add-meter';
import ChangeAccount from './scenes/change-account';
import Login from './scenes/login';
import MeterGraphs from './scenes/meter-graphs';
import Meters from './scenes/meters';
import Overview from './scenes/overview';
import Register from './scenes/register';
import Settings from './scenes/settings';
import Splash from './scenes/splash';

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
              scene = <Splash pushRoute={navigator.push}/>;
              break;
            case 'login':
              scene = <Login pushRoute={navigator.push}/>;
              break;
            case 'register':
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
            case 'meterGraphs':
              scene = <MeterGraphs {...route.passProps}/>;
              break;
          }

          return scene;
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
