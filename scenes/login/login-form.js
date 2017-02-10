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

  onButtonPress(){
    this.props.navigator.push({
      id:'Register'
    });
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
        <TouchableHighlight 
          style={styles.buttonLoginContainer}>
          <Text style={styles.buttonText}>LOGIN</Text>
          {/*onPress={this.submitToServer} */}
        </TouchableHighlight>
        <TouchableHighlight 
         onPress={this.onButtonPress.bind(this)}
         style={styles.buttonSignUpContainer}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableHighlight>

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
    // padding: 20,
    justifyContent: 'flex-start'
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10,
    padding: 20,
  },
  buttonLoginContainer: {
    backgroundColor: 'rgb(31, 58, 147)',
    paddingVertical: 15,
    marginTop:30,
    height: 50
  },
  buttonSignUpContainer: {
    backgroundColor: 'rgb(171, 183, 183)',
    paddingVertical: 15,
    // marginBottom:5,
    height: 50
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700'
  }
});
