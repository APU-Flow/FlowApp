// nav-drawer.android.js
// Flow

import React, { Component } from 'react';
import { StyleSheet, DrawerLayoutAndroid, View, Text, TouchableHighlight } from 'react-native';

export default class NavDrawerAndroid extends Component {

  static get propTypes() {
    return {
      pushRoute: React.PropTypes.func.isRequired,
      currentRouteName: React.PropTypes.string,
      drawerLockMode: React.PropTypes.string,
      children: React.PropTypes.element.isRequired
    };
  }
  
  static get defaultProps() {
    return {
      drawerLockMode: 'unlocked',
      currentRouteName: ''
    };
  }

  constructor(props) {
    super(props);

    // Initialize state variables
    this.state = {
      routeList: ['overview', 'meters', 'settings']
    };
  }

  render() {
    let navigationView = (
      <View style={styles.drawerContainer}>
        {this.state.routeList.map((route) => {
          let isCurrentRoute = route === this.props.currentRouteName;
          return (
            <TouchableHighlight
              key={route}
              style={[styles.drawerItem, isCurrentRoute && styles.selectedItem]}
              onPress={isCurrentRoute ? null : () => this.props.pushRoute({name: route})}>
                <Text style={[styles.drawerItemText, isCurrentRoute && styles.selectedItemText]}>
                  {route.charAt(0).toUpperCase() + route.slice(1)}
                </Text>
            </TouchableHighlight>
          );
        })}
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

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },

  drawerItem: {
    backgroundColor: '#fff',
    height: 60,
    justifyContent: 'center',
    borderBottomColor: '#e3f5ff',
    borderBottomWidth: 0.5,
    paddingLeft: 16
  },
  selectedItem: {
    backgroundColor: '#b3c5ff'
  },

  drawerItemText: {
    textAlign: 'left',
    color: '#000',
    fontWeight: 'normal',
    fontSize: 14
  },
  selectedItemText: {
    color: '#1f3a93'
  }

});
