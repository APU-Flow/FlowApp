// login-form.js
// Flow

import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Button, Text } from 'react-native';

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
      <View style={styles.container}>
        <TextInput
          placeholder="username or email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          returnKeyType="next"
          onChangeText={(text) => this.setState({ email: text })}
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          placeholderTextColor="rgba(255,255,255,0.7)"
          onChangeText={(text) => this.setState({ password: text })}
          returnKeyType="go"
          secureTextEntry
          style={styles.input}
          ref={(input) => this.passwordInput = input}
        />
        <Button 
          title="LOGIN" 
          onPress={this.submitToServer} 
          style={styles.buttonContainer}
        />
        <Text>{this.state.submitReport}</Text>
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
    padding: 20,
    justifyContent: 'flex-start'
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: 'rgb(44,62,80)',
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  }
});
