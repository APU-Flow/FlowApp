// login.js
// Flow

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import LoginForm from './login-form';

export default class Login extends Component{
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../images/flow.png')}
          />
        </View>
        <View>
          <LoginForm />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    backgroundColor:'rgb(52,152,219)'
  },
  logo: {
    flex: 1,
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  logoContainer: {
    justifyContent:'center',
    alignItems:'center',
    flexGrow:1
  }
  ,
  formContainer:{
    flex:1,
    justifyContent:'space-between',
    alignItems:'center'
  }
});
