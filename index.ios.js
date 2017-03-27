// index.ios.js
// Flow

import React, { Component } from 'react';
import { AppRegistry, Navigator, Text } from 'react-native';

import NavBarIOS from './components/nav-bar.ios';
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
        initialRoute={{ name: 'meters' }}
        configureScene={(route) => route.sceneConfig || Navigator.SceneConfigs.FloatFromBottom}
        renderScene={(route, navigator) => {
          let scene = <Text>Bad route name given!</Text>;

          switch (route.name) {
            case 'splash':
              return  <Splash pushRoute={navigator.push} />;
            case 'login':
              return <Login pushRoute={navigator.push} {...route.passProps} />;
            case 'register':
              return <Register pushRoute={navigator.push} {...route.passProps} />;
            case 'settings':
              return (
                <NavBarIOS>
                  <Settings {...route.passsProps} />
                </NavBarIOS>
              ) 
            case 'changeAccount':
              return <ChangeAccount {...route.passProps} />;
            case 'meters':
              return (
                <NavBarIOS>
                  <Meters {...route.passProps} />
                </NavBarIOS>
                )
            case 'overview':
              return (
                <NavBarIOS>
                  <Overview {...route.passProps} />
                </NavBarIOS>
                )
            default:
              return <Text>Bad route name given!</Text>
          }
        }}
      />
    );
  }
}

AppRegistry.registerComponent('FlowApp', () => FlowApp);
