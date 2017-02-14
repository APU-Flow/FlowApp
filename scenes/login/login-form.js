// login-form.js
// Flow

import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableHighlight, Navigator } from 'react-native';

export default class LoginForm extends Component {
  static get defaultProps() {
    return {
      onSuccess: (response) => console.log(response)
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
        <Text style={styles.text}>Log In</Text>
        <TextInput style={styles.field}
          placeholder="Email"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="none"
          returnKeyType="next"
        />
        <TextInput style={styles.field}
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="none"
          returnKeyType="next"
          secureTextEntry={true}
        />
        <TouchableHighlight style={styles.buttonLoginContainer}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableHighlight>
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
    .then((response) => response.json())
    .then((responseObject) => {
      if (typeof responseObject.user === 'string') {
        this.setState({ submitReport: '' });
        this.props.onSuccess(responseObject);
      }
      else
        this.setState({ submitReport: 'Login failed; bad username or password.' });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(52,152,219)',
    padding: 30
  },
  field: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    marginTop: 10,
    paddingHorizontal: 10,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1
  },
  text: {
    textAlign: 'center',
    color: 'white',
    marginTop: 150,
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 20
  },
  buttonLoginContainer: {
    backgroundColor: 'rgb(31,58,147)',
    paddingVertical: 15,
    height: 60,
    justifyContent: 'flex-end',
    marginTop:70
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '500',
    fontSize: 20
  }
});
