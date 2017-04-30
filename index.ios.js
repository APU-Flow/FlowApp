// index.ios.js
// Flow

import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, AsyncStorage, Alert} from 'react-native';

import NavBarIOS from './components/nav-bar.ios';
import Settings from './scenes/settings';
import Meters from './scenes/meters';
import ChangeAccount from './scenes/change-account';
import Splash from './scenes/splash';
import Login from './scenes/login';
import Register from './scenes/register';
import Overview from './scenes/overview';
import Test from './scenes/test';
import Graphs from './scenes/graphs';

export default class FlowApp extends Component {

  constructor(props) {
    super(props);
    
    this.logout = this.logout.bind(this);
  }

  render() {
    return (
      <Navigator
        initialRoute={{ name: 'login' }}
        configureScene={(route) => route.sceneConfig || Navigator.SceneConfigs.FloatFromBottom}
        renderScene={(route, navigator) => {
          let scene = <Text>Bad route name given!</Text>;

          switch (route.name) {
            case 'splash':
              return  <Splash pushRoute={navigator.push} />;
            case 'login':
              return <Login pushRoute={navigator.push} {...route.passProps} />;
            case 'register':
              return <Register pushRoute={navigator.push} {...route.passProps}/>;
            case 'overview':
              return <NavBarIOS selectedTab = 'overview' {...route.passProps} logout={() => this.logout(navigator)}/>
            case 'graphs':
              return <NavBarIOS selectedTab = 'graphs' {...route.passProps} logout={() => this.logout(navigator)}/>
            case 'meters':
              return <NavBarIOS selectedTab = 'meters' {...route.passProps} logout={() => this.logout(navigator)}/> 
            case 'settings':
              return <NavBarIOS selectedTab = 'settings' logout={() => this.logout(navigator)} {...route.passProps}/>
            case 'test':
              return <NavBarIOS selectedTab = 'test' {...route.passProps} logout={() => this.logout(navigator)}/>
            default:
              return <Text>Bad route name given!</Text>
          }
        }}
      />
    );
  }

  logout(navigator) {
        AsyncStorage.multiRemove(['email', 'token', 'firstName'], (err) => {
            if (err) Alert.alert('Error', err.toString());

            navigator.resetTo({ name: 'login' });
        });
    }

}

AppRegistry.registerComponent('FlowApp', () => FlowApp);
