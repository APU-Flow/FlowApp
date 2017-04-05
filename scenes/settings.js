// settings.js
// Flow

'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, Alert, View, TouchableHighlight } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalDropdown from 'react-native-modal-dropdown';

var Login = require('../scenes/login');
var Splash = require('../scenes/splash');

export default class Settings extends Component {

  static get propTypes() {
    return {
      title: React.PropTypes.string,
      navReset: React.PropTypes.func.isRequired
    };
  }

  static get defaultProps() {
    return {
      title: 'Settings'
    };
  }

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <TouchableHighlight style={styles.button} onPress={this.handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText}>Add Meter</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText}>Drop Meter</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.confirmDeleteHistory}>
          <Text style={styles.buttonText}>Delete Data History</Text>
        </TouchableHighlight>
      </KeyboardAwareScrollView>
    );
  }

  handleLogout() {
    this.props.navReset({
      name: 'login',
    });
  }

  

  confirmDeleteHistory() {
    Alert.alert(
      'Delete Data History',
      'Are you sure you want to delete your data history?',
      [
        { text: 'Cancel', onPress: () => Alert.alert('Data deleted'), style: 'cancel' },
        { text: 'Yes', onPress: () => Alert.alert('Yes Pressed') }
      ],
      { cancelable: false }
    );
  }

  contactUs() {
    Alert.alert('Contact Us at www.flow.org');
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(52,152,219)',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    marginTop: 25,
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 15
  },
  button: {
    margin: 8,
    backgroundColor: 'rgb(31,58,147)',
    paddingVertical: 10,
    height: 50,
    justifyContent: 'center',
    marginTop:15
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '500',
    fontSize: 20
  }
});

module.exports = Settings;