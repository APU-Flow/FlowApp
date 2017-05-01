// nav-bar.ios.js
// Flow

import React, { Component } from 'react';
import { StyleSheet, TabBarIOS, View, Text, TouchableHighlight, AsyncStorage, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

var Overview = require('../scenes/overview');
var Meters = require('../scenes/meters');
var MeterGraphs = require('../scenes/meter-graphs');
var Settings = require('../scenes/settings');
var Splash = require('../scenes/splash');
var Test = require('../scenes/test');

'use strict';

export default class NavBarIOS extends Component {

    static get propTypes() {
        return {
            logout: React.PropTypes.func.isRequired
        };
    }


    static get defaultProps() {
        return {
            currentRouteName: 'Overview'
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: props.selectedTab
        };
    
    }


    render() {
        return (
            <TabBarIOS selectedTab={this.state.selectedTab}>
                <Icon.TabBarItem
                    title="Home"
                    iconName="ios-home-outline"
                    selectedIconName="ios-home"
                    ios-stats-outline
                    selected={this.state.selectedTab === 'overview'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'overview',
                        });
                    }}>
                    <Overview />
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title="Graphs"
                    iconName="ios-stats-outline"
                    selectedIconName="ios-stats"
                    selected={this.state.selectedTab === 'graphs'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'graphs',
                        });
                    }}>
                    <MeterGraphs meterId={this.props.meterId} />
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title="Meters"
                    iconName="ios-water-outline"
                    selectedIconName="ios-water"
                    selected={this.state.selectedTab === 'Meters'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'Meters',
                        });
                    }}>
                    <Meters />
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title="Settings"
                    iconName="ios-settings-outline"
                    selectedIconName="ios-settings"
                    selected={this.state.selectedTab === 'settings'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'settings',
                        });
                    }}>
                    <Settings logout={this.props.logout} />
                </Icon.TabBarItem>
            </TabBarIOS>
        );
    }
}

const styles = StyleSheet.create({
    barContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    selectedItem: {
        backgroundColor: '#b3c5ff'
    },
});