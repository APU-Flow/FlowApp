// splash.js
// Flow

import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight, Navigator } from 'react-native';

export default class Splash extends Component {

  static get defaultProps() {
    return {
      // This component should always be passed a method for pushing a scene to the navigator. When it isn't, log this error.
      pushRoute(scene) {
        console.log(`Error navigating to ${scene.name ? scene.name : 'next'} scene! No pushRoute method given to Splash scene!`);
      }
    };
  }

  constructor(props) {
    super(props);

    this.loadLoginForm = this.loadLoginForm.bind(this);
    this.loadRegisterForm = this.loadRegisterForm.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo}
            source={require('./images/flow.png')}
          />
        </View>
        <View>
          <TouchableHighlight style={styles.buttonLoginContainer}
            onPress={this.loadLoginForm}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonSignUpContainer}
            onPress={this.loadRegisterForm}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  loadLoginForm() {
    this.props.pushRoute({
      name: 'login',
      sceneConfig: Navigator.SceneConfigs.PushFromRight
    });
  }
  loadRegisterForm() {
    this.props.pushRoute({
      name: 'register',
      sceneConfig: Navigator.SceneConfigs.PushFromRight
    });
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
    justifyContent: 'center'
  },
  buttonSignUpContainer: {
    backgroundColor: 'rgb(171,183,183)',
    paddingVertical: 15,
    height: 60,
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700',
    fontSize: 20
  }
});
