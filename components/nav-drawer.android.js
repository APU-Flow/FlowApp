// nav-drawer.android.js
// Flow

import React, { Component } from 'react';
import { DrawerLayoutAndroid, View, Text } from 'react-native';

export default class NavDrawerAndroid extends Component {

  static get defaultProps() {
    return {
      // This component should always be passed a method for pushing a scene to the navigator. When it isn't, log this error.
      pushScene(scene) {
        console.log(`Error navigating to ${scene.name ? scene.name : 'next'} scene! No pushScene method given to Splash scene!`);
      },
      drawerLockMode: 'unlocked'
    };
  }

  render() {
    let navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>
          I'm in the navigation drawer!
        </Text>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}
        drawerLockMode={this.props.drawerLockMode}>

          {this.props.children}

      </DrawerLayoutAndroid>
    );
  }
}
