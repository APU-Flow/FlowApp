// index.ios.js
// Flow

import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, AsyncStorage, Alert } from 'react-native';

import NavBarIOS from './components/nav-bar.ios';
import Settings from './scenes/settings';
import Meters from './scenes/meters';
import Graphs from './scenes/graphs';
import MeterGraphs from './scenes/meter-graphs';
import ChangeAccount from './scenes/change-account';
import Splash from './scenes/splash';
import Login from './scenes/login';
import Register from './scenes/register';
import Overview from './scenes/overview';

export default class FlowApp extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Navigator
        initialRoute={{ name: 'overview' }}
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
            case 'overview':
              return <NavBarIOS selectedTab = 'overview' {...route.passProps}/>
            case 'graphs':
              return <NavBarIOS selectedTab = 'graphs' {...route.passProps}/>
            case 'meters':
              return <NavBarIOS selectedTab = 'meters' {...route.passProps}/> 
            case 'settings':
              return <NavBarIOS selectedTab = 'settings' {...route.passProps} /> 
            case 'meterGraphs':
              return <NavBarIOS selectedTab = 'meterGraphs' />
            default:
              return <Text>Bad route name given!</Text>
          }
        }}
      />
    );
  }

}

AppRegistry.registerComponent('FlowApp', () => FlowApp);
