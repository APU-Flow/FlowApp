// nav-bar.ios.js
// Flow
'use strict';

import React, { Component } from 'react';
import { TabBarIOS } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Graphs from './scenes/graphs';
import Meters from './scenes/meters';
import Overview from './scenes/overview';
import Settings from './scenes/settings';


export default class NavBarIOS extends Component {

  static get propTypes() {
    return {
      logout: React.PropTypes.func.isRequired,
      selectedTab: React.PropTypes.string,
      children: React.PropTypes.element.isRequired,
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
          <Graphs meterId={this.props.meterId} />
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
          <Meters pushRoute={this.props.pushRoute} meterId={this.props.meterId}/>
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
