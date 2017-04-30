// nav-drawer.android.js
// Flow

import React, { Component } from 'react';
import { StyleSheet, DrawerLayoutAndroid, View, Text, TouchableHighlight, Alert, BackAndroid } from 'react-native';

export default class NavDrawerAndroid extends Component {

  static get propTypes() {
    return {
      pushRoute: React.PropTypes.func.isRequired,
      popRoute: React.PropTypes.func.isRequired,
      logout: React.PropTypes.func.isRequired,
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

    this.handleBackButton = this.handleBackButton.bind(this);
  }

  handleBackButton() {
    switch (this.props.currentRouteName) {
      case 'splash':
        return false;
      case 'overview':
        Alert.alert(
          'Logout?',
          'Would you like to log out?',
          [
            { text: 'No', style: 'cancel' },
            { text: 'Yes', onPress: this.props.logout }
          ]
        );
        return true;
      default:
        this.props.popRoute();
        return true;
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
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
