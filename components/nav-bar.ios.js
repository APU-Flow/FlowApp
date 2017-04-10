// nav-bar.ios.js
// Flow

import React, { Component } from 'react';
import { StyleSheet, TabBarIOS, View, Text, TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

var Overview = require('../scenes/overview');
var Meters = require('../scenes/meters');
var Graphs = require('../scenes/graphs');
var Settings = require('../scenes/settings');

'use strict';

export default class NavBarIOS extends Component {

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

    static get propTypes() {
        return {
            // pushRoute: React.PropTypes.func.isRequired,
            currentRouteName: React.PropTypes.string,
            navReset: React.PropTypes.func.isRequired,
            // children: React.PropTypes.element.isRequired
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
                    {/*<Overview pushRoute={this.props.pushRoute}/>*/}
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
                    <Graphs />
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title="Meters"
                    iconName="ios-water-outline"
                    selectedIconName="ios-water"
                    selected={this.state.selectedTab === 'meters'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'meters',
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
                    <Settings navReset={navigator.resetTo} />
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