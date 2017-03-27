// nav-bar.ios.js
// Flow

import React, { Component } from 'react';
import { StyleSheet, TabBarIOS, View, Text, TouchableHighlight } from 'react-native';

var Overview = require('./overview');
var Meters = require('./meters');
var Settings = require('./settings');

export default class NavBarIOS extends Component {

    static get defaultProps() {
        return {
            // This component should always be passed a method for pushing a scene to the navigator. When it isn't, log this error.
            pushRoute(scene) {
                console.log(`Error navigating to ${scene.name ? scene.name : 'next'} scene! No pushRoute method given to Splash scene!`);
            },
            currentRouteName: ''
        };
    }


    constructor(props) {
        super(props);

        // Initialize state variables
        this.state = {
            routeList: ['overview', 'meters', 'settings']
        }
    }

    render() {
        let navigationView = (
            <NavBarIOS style={styles.barContainer}>
                {this.state.routeList.map((route) => {
                    let isCurrentRoute = route == this.props.currentRouteName;
                    return (
                        <TabBarIOS selectedTab={this.state.selectedTab}>
                            <TabBarIOS.Item
                                selected={this.state.selectedTab === 'overview'}
                                icon={{ uri: 'featured' }}
                                onPress={() => {
                                    this.setState({
                                        selectedTab: 'overview',
                                    });
                                }}>
                                <Overview />
                            </TabBarIOS.Item>
                            <TabBarIOS.Item
                                selected={this.state.selectedTab === 'meters'}
                                icon={{ uri: 'contacts' }}
                                onPress={() => {
                                    this.setState({
                                        selectedTab: 'meters',
                                    });
                                }}>
                                <Meters />
                            </TabBarIOS.Item>
                            <TabBarIOS.Item
                                selected={this.state.selectedTab === 'settings'}
                                icon={{ uri: 'contacts' }}
                                onPress={() => {
                                    this.setState({
                                        selectedTab: 'settings',
                                    });
                                }}>
                                <Settings />
                            </TabBarIOS.Item>
                        </TabBarIOS>
                    );
                })}
      </NavBarIOS>
        );
        /*return (
          <NavBarIOS
            drawerWidth={300}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => navigationView}
            drawerLockMode={this.props.drawerLockMode}>
    
              {this.props.children}
    
          </NavBarIOS>
        );*/
    }
}

const styles = StyleSheet.create({
    barContainer: {
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