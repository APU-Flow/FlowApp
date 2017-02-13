// register.js
// Flow

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
    // Initialize state variables
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
      fieldValidities: [false, false, false, false, false, false, false, false, false],
      allValid: false
    }

    // Bind functions to instance
    this.verifyInput = this.verifyInput.bind(this);
    this.submitToServer = this.submitToServer.bind(this);
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <TextInput style={[styles.field, !this.state.fieldValidities[0] && styles.invalid]}
          underlineColorAndroid={this.state.fieldValidities[0] ? 'black' : 'red'}
          placeholder="First Name"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('firstName', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[1] && styles.invalid]}
          underlineColorAndroid={this.state.fieldValidities[1] ? 'black' : 'red'}
          placeholder="Last Name"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('lastName', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[2] && styles.invalid]}
          underlineColorAndroid={this.state.fieldValidities[2] ? 'black' : 'red'}
          placeholder="Email Address"
          placeholderTextColor="rgba(255,255,255,0.5)"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('email', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[3] && styles.invalid]}
          underlineColorAndroid={this.state.fieldValidities[3] ? 'black' : 'red'}
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('password', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[4] && styles.invalid]}
          placeholder="Re-enter Password"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('passwordVerification', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[5] && styles.invalid]}
          underlineColorAndroid={this.state.fieldValidities[5] ? 'black' : 'red'}
          placeholder="Street Address"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('address', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[6] && styles.invalid]}
          underlineColorAndroid={this.state.fieldValidities[6] ? 'black' : 'red'}
          placeholder="City"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('city', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[7] && styles.invalid]}
          underlineColorAndroid={this.state.fieldValidities[7] ? 'black' : 'red'}
          placeholder="State"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="characters"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('state', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[8] && styles.invalid]}
          underlineColorAndroid={this.state.fieldValidities[8] ? 'black' : 'red'}
          placeholder="Zip"
          placeholderTextColor="rgba(255,255,255,0.5)"
          keyboardType="numeric"
          returnKeyType="done"
          onChangeText={(text) => this.verifyInput('zip', text)}
        />
        <Button 
          style = {styles.buttonContainer}
          title="SUBMIT" 
          onPress={this.submitToServer} 
          disabled={!this.state.allValid}
        />
      </KeyboardAwareScrollView>
    )
  }

  verifyInput(name, text) {
    switch(name) {
      case 'firstName':
        this.state.fieldValidities[0] = /^[A-Z' \-]{1,20}$/i.test(text);
        break;
      case 'lastName':
        this.state.fieldValidities[1] = (/^[A-Z'\-]{1,20}$/i.test(text));
        break;
      case 'email':
        this.state.fieldValidities[2] = (/^[A-Z0-9._\-%+]{1,20}@[A-Z0-9\-.]{1,20}\.[A-Z]{2,4}$/i.test(text));
        break;
      case 'password':
        this.state.fieldValidities[3] = (/^[A-Z0-9`~!@#$%^&*()\-=_+<>,.?]{5,20}$/i.test(text));
        // Intentional lack of 'break;' to update passsword verification styles when password changes
      case 'passwordVerification':
        this.state.fieldValidities[4] = (text == this.state.password);
        break;
      case 'address':
        this.state.fieldValidities[5] = (/^[0-9]{1,8} [A-Z'#.& \-]{2,30}$/i.test(text));
        break;
      case 'city':
        this.state.fieldValidities[6] = (/^[A-Z' \-]{2,25}$/i.test(text));
        break;
      case 'state':
        this.state.fieldValidities[7] = (/^[A-Z]{2}$/.test(text));
        break;
      case 'zip':
        this.state.fieldValidities[8] = (/^\d{5}(-\d{4})?$/.test(text));
        break;
    }

    this.setState({allValid: this.state.fieldValidities.every((value) => value === true)});

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
    .then((responseText) => console.log(responseText));
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor:'rgb(52,152,219)'
  },
  field: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginTop:22,
    color: '#FFF',
    paddingHorizontal: 10
  },
  invalid: {
    borderColor: 'red'
  },
  buttonContainer: {
    backgroundColor: 'black',
    paddingVertical: 15
  },
});