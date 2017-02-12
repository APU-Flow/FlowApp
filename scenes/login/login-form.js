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
       // {/*<Text>{this.state.submitReport}</Text>*/}
      <View>
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
  // input: {
  //   height: 40,
  //   backgroundColor: 'rgba(255,255,255,0.2)',
  //   // marginBottom: 10,
  //   color: '#FFF',
  //   paddingHorizontal: 10,
  //   padding: 20,
  // },
  buttonLoginContainer: {
    backgroundColor: 'rgb(31,58,147)',
    paddingVertical: 15,
    // marginTop:10,
    height: 60,
    justifyContent:'flex-end'
  },
  buttonSignUpContainer: {
    backgroundColor: 'rgb(171,183,183)',
    paddingVertical: 15,
    height: 60,
    justifyContent:'flex-end'
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700',
    fontSize:20
  }
});
