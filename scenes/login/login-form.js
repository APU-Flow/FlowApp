// login-form.js
// Flow

import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableHighlight, Navigator } from 'react-native';

export default class LoginForm extends Component {
  static get defaultProps() {
    return {
      title: 'LoginForm'
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }

    this.submitToServer = this.submitToServer.bind(this);
  }
  render() {
    return (
      <View>
        {/*onPress={this.submitToServer.bind(this)}*/}
      </View>
    );
  }

  submitToServer() {
    fetch('http://138.68.56.236:3000/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then((response) => response.text())
      .then((responseText) => console.log(responseText));
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start'
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    // marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10,
    padding: 20,
  }
});
