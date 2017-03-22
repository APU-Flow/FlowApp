// overview.js
// Flow

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  AlertIOS
} from 'react-native';

export default class FirstTabScreen extends Component {
  static navigatorButtons = {
    leftButtons: [{
      icon: require('../../img/navicon_menu.png'),
      id: 'menu'
    }],
    rightButtons: [
      {
        title: 'Edit',
        id: 'edit'
      },
      {
        icon: require('../../img/navicon_add.png'),
        id: 'add'
      }
    ]
  };

  componentDidMount() {
    AsyncStorage.multiGet(['email', 'token'], (errors, results) => {
      if (errors) {
        console.error(errors);
      }
      let email = results[0][1];
      let token = results[1][1];
      // let now = new Date();
      // let hourAgo = new Date();
      // hourAgo.setHours(hourAgo.getHours()-1);
      fetch(`http://138.68.56.236:3000/api/getUsageEvent?email=${encodeURI(email)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': token
        }
      })
        .then((response) => response.text())
        .then((responseText) => {
          this.setState({ data: responseText });
        });
    });
  }


  static navigatorStyle = {
    drawUnderTabBar: true
  };
  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  onNavigatorEvent(event) {
    if (event.id == 'menu') {
      this.props.navigator.toggleDrawer({
        side: 'left',
        animated: true
      });
    }
    if (event.id == 'edit') {
      AlertIOS.alert('NavBar', 'Edit button pressed');
    }
    if (event.id == 'add') {
      AlertIOS.alert('NavBar', 'Add button pressed');
    }
  }
  render() {
    return (
      <View style={{ flex: 1, padding: 20 }}>

        <TouchableOpacity onPress={this.onPushPress.bind(this)}>
          <Text style={styles.button}>Push Plain Screen</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.onPushStyledPress.bind(this)}>
          <Text style={styles.button}>Push Styled Screen</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.onModalPress.bind(this)}>
          <Text style={styles.button}>Show Modal Screen</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.onLightBoxPress.bind(this)}>
          <Text style={styles.button}>Show LightBox</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.onInAppNotificationPress.bind(this)}>
          <Text style={styles.button}>Show In-App Notification</Text>
        </TouchableOpacity>

      </View>
    );
  }
  onPushPress() {
    this.props.navigator.push({
      title: "Settings"
    });
  }
  onPushStyledPress() {
    this.props.navigator.push({
      title: "Styled",
      screen: "example.StyledScreen"
    });
  }
}

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: 'blue'
  }
});