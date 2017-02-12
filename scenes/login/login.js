// login.js
// Flow

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Navigator } from 'react-native';
import LoginForm from './login-form';

export default class Login extends Component {

  onButtonPress() {
    this.props.navigator.push({
      id: 'login-form'
    });
  }

  render() {
    const routes = [
      { title: 'LoginForm', index: 0 },
      { title: 'Register', index: 1 },
    ];
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo}
            source={require('../images/flow.png')}
          />
        </View>
        <View>
          <TouchableHighlight style={styles.buttonLoginContainer}>
            onPress={this.onButtonPress.bind(this)}
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonSignUpContainer}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(52,152,219)'
  },
  logo: {
    flex: 1,
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  buttonLoginContainer: {
    backgroundColor: 'rgb(31,58,147)',
    paddingVertical: 15,
    height: 60,
    justifyContent: 'flex-end'
  },
  buttonSignUpContainer: {
    backgroundColor: 'rgb(171,183,183)',
    paddingVertical: 15,
    height: 60,
    justifyContent: 'flex-end'
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700',
    fontSize: 20
  }
});
