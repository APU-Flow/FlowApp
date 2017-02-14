// login.js
// Flow

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import LoginForm from './login-form';

export default class Login extends Component {

  // Define default loadOverviewScene prop - this is only for when this element is used
  // improperly elsewhere in our code, but it'll be an easier error to debug this way.
  static get defaultProps() {
    return {
      loadOverviewScene: () => this.setState({ message: 'Error loading next scene; no loadOverviewScene method given!' })
    };
  }

  constructor(props) {
    super(props);

    this.loadUserData = this.loadUserData.bind(this);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../images/flow.jpg')}
          />
        </View>
        <View>
          <LoginForm onSuccess={loadUserData} />
        </View>
      </KeyboardAvoidingView>
    );
  }

  loadUserData(userObject) {
    // Do stuff with user data
    // Load the next scene
    this.props.loadOverviewScene();
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    backgroundColor:'rgb(52,152,219)'
  },
  logo: {
    width:200,
    height:200
  },
  logoContainer: {
    justifyContent:'center',
    alignItems:'center',
    flexGrow:1
  },
  formContainer:{
    flex:1,
    justifyContent:'space-between',
    alignItems:'center'
  }
});
