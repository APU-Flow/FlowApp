// login.js
// Flow

import React, { Component } from 'react';
import { Alert, AsyncStorage, View, StyleSheet, TextInput, Text, TouchableHighlight } from 'react-native';

export default class LoginForm extends Component {

  static get propTypes() {
    return {
      pushRoute: React.PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitReport: ''
    };

    this.submitToServer = this.submitToServer.bind(this);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Log In</Text>
        <TextInput style={styles.field}
          placeholder="Email"
          placeholderTextColor="rgba(255,255,255,0.5)"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput style={styles.field}
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="none"
          returnKeyType="done"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <TouchableHighlight style={styles.buttonLoginContainer}
          onPress={this.submitToServer}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableHighlight>
        <Text>{this.state.submitReport}</Text>
      </View>
    );
  }

  submitToServer() {
    fetch('http://138.68.56.236:3000/login', {
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
    .then((response) => {
      switch (response.status) {
        case 200:
          response.json().then(async (responseObject) => {
            this.setState({ submitReport: '' });

            try {
              await AsyncStorage.multiSet([
                ['email', responseObject.email],
                ['firstName', responseObject.firstName],
                ['token', responseObject.token]
              ]);
            } catch (error) {
              Alert.alert('Error', error.toString());
            }

            this.props.pushRoute({ name: 'overview', passProps: {message: JSON.stringify(responseObject)} });
          });
          break;
        default:
          response.json().then((responseObject) => this.setState({ submitReport: `Login failed: ${responseObject.message}` }));
      }
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
    justifyContent: 'center',
    marginTop:70
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '500',
    fontSize: 20
  }
});
