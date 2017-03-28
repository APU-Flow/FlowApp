// nav-graph-type-dropdown.js
// Flow

import React, { Component } from 'react';
import { StyleSheet, DrawerLayoutAndroid, View, Text, TouchableHighlight } from 'react-native';

export default class NavGraphTypeDropdown extends Component {

  static get defaultProps() {
    return {
      // This component should always be passed a method for pushing a scene to the navigator. When it isn't, log this error.
      pushRoute(scene) {
        console.log(`Error navigating to ${scene.name ? scene.name : 'next'} scene! No pushRoute method given to Splash scene!`);
      },
      drawerLockMode: 'unlocked',
      currentRouteName: ''
    };
  }

  constructor(props) {
    super(props);

    // Initialize state variables
    this.state = {
      routeList: ['line', 'bar', 'pie']
    }
  }

  render() {
    let navigationView = (
      <View style={styles.drawerContainer}>
        {this.state.routeList.map((route) => {
          let isCurrentRoute = route == this.props.currentRouteName;
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

      dropdownRenderRow(rowData, rowID, highlighted) {
    let evenRow = rowID % 2;
    return (
      <TouchableHighlight underlayColor='cornflowerblue'>
       <View style={[styles.dropdownRow, {backgroundColor: evenRow ? 'rgb(31,58,147)' : 'rgb(31,58,147)'}]}>
          <Text style={[styles.dropdownRowText, highlighted && {color: 'white'}]}>
             {rowData}
          </Text>
        </View>
      </TouchableHighlight>
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
  },
  dropdown: {
      margin: 8,
      borderColor:  'rgb(31,58,147)',
      backgroundColor: 'rgb(31,58,147)',
      borderWidth: 1,
      borderRadius: 1,
      width:170,
      height:45,
    },
    dropdownText: {
      marginVertical: 10,
      marginHorizontal: 6,
      fontSize: 18,
      color: 'white',
      textAlign: 'center',
      textAlignVertical: 'center',
    },
     dropdownDropdown: {
      margin: 8,
      width: 152,
      height: 100,
      borderColor: 'rgb(31,58,147)',
      borderWidth: 2,
      borderRadius: 3,
      backgroundColor: 'rgb(31,58,147)',
    },
    dropdownRow: {
      flexDirection: 'row',
      height: 40,
      alignItems: 'center',
      backgroundColor: 'rgb(31,58,147)'
    },
    dropdownRowText: {
      marginHorizontal: 4,
      fontSize: 16,
      color: 'white',
      textAlignVertical: 'center',
      textAlign: 'center',
    }

});