import React, { Component } from 'react';
import { StyleSheet, TextInput, Button, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Register extends Component {
  static get defaultProps() {
    return {
      title: 'Register'
    };
  }

  constructor(props) {
    super(props);
    //Initialize state variables so the Text fields don't get mad. 
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordVerification: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      submitReport: []
    }

    this.verifyInput = this.verifyInput.bind(this);
    this.submitToServer = this.submitToServer.bind(this);
  }

  render() {
    return (
      <KeyboardAwareScrollView keyboardDismissMode="interactive" style={styles.container}>
        <TextInput style={styles.field}
          placeholder="First Name:"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('firstName', text)}
        />
        <Text>{this.state.firstName}</Text>
        <TextInput style={styles.field}
          placeholder="Last Name:"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('lastName', text)}
        />
        <Text>{this.state.lastName}</Text>
        <TextInput style={styles.field}
          placeholder="Email Address:"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('email', text)}
        />
        <Text>{this.state.email}</Text>
        <TextInput style={styles.field}
          placeholder="Password:"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('password', text)}
        />
        <Text>{this.state.password}</Text>
        <TextInput style={styles.field}
          placeholder="Re-enter Password:"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('passwordVerification', text)}
        />
        <Text>{this.state.passwordVerification}</Text>
        <TextInput style={styles.field}
          placeholder="Street Address:"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('address', text)}
        />
        <Text>{this.state.address}</Text>
        <TextInput style={styles.field}
          placeholder="City:"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('city', text)}
        />
        <Text>{this.state.city}</Text>
        <TextInput style={styles.field}
          placeholder="State:"
          autoCapitalize="characters"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('state', text)}
        />
        <Text>{this.state.zip}</Text>
        <TextInput style={styles.field}
          placeholder="Zip:"
          keyboardType="numeric"
          returnKeyType="done"
          onChangeText={(text) => this.verifyInput('zip', text)}
        />
        <Text>{this.state.zip}</Text>
        <Button title="Submit" onPress={this.submitToServer} />
        <Text>{this.state.submitReport}</Text>
        <Text>{'\n\n'}</Text>
        <Text>{this.state.serverResponse}</Text>
      </KeyboardAwareScrollView>
    )
  }

  verifyInput(name, text) {
    switch(name) {
      case 'firstName':
        this.state.submitReport[0] = (/^[A-Z' \-]$/i.test(text)) ? 'Good firstName\n' : 'Bad firstName\n';
        break;
      case 'lastName':
        this.state.submitReport[1] = (/^[A-Z'\-]$/i.test(text)) ? 'Good zlastNameip\n' : 'Bad zip\n';
        break;
      case 'email':
        this.state.submitReport[2] = (/^[A-Z0-9._\-%+]+@[A-Z0-9\-.]+\.[A-Z]{2,4}$/i.test(text)) ? 'Good email\n' : 'Bad email\n';
        break;
      case 'password':
        this.state.submitReport[3] = (/^[A-Z0-9`~!@#%^&*()\-=_+<>,.?]{5,20}$/i.test(text)) ? 'Good password\n' : 'Bad password\n';
        break;
      case 'passwordVerification':
        this.state.submitReport[4] = (text == this.state.password) ? 'Passwords match\n' : 'Passwords do not match\n';
        break;
      case 'address':
        this.state.submitReport[5] = (/^[0-9]{1,8} [A-Z'#.& \-]{2,}[^ ]$/i.test(text)) ? 'Good address\n' : 'Bad address\n';
        break;
      case 'city':
        this.state.submitReport[6] = (/^[A-Z' \-]{2,}[^ ]$/i.test(text)) ? 'Good city\n' : 'Bad city\n';
        break;
      case 'state':
        this.state.submitReport[7] = (/^[A-Z]{2}$/.test(text)) ? 'Good state\n' : 'Bad state\n';
        break;
      case 'zip':
        this.state.submitReport[8] = (/^\d{5}(-\d{4})?$/.test(text)) ? 'Good zip\n' : 'Bad zip\n';
        break;
    }

    this.setState({[name]: text});
  }

  submitToServer() {
    fetch('http://138.68.56.236:3000/api/newUser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        streetAddress: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip
      })
    })
    .then((response) => response.text())
    .then((responseText) => this.setState({serverResponse: responseText}));
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#F0F8FF'
  },
  field: {
    fontSize: 14,
    textAlign: 'left'
  }
});