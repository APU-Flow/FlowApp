// register.js
// Flow

import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, TouchableHighlight } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Register extends Component {
  static get defaultProps() {
    return {
      onSuccess: (responseObject) => console.log(responseObject)
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
      allValid: false,
      submitReport: ''
    }

    // Bind functions to instance
    this.verifyInput = this.verifyInput.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.text}>Register</Text>
        <TextInput style={[styles.field, !this.state.fieldValidities[0] && styles.invalid]}
          borderColor={this.state.fieldValidities[0] ? 'green' : 'grey'}
          borderWidth={2}
          placeholder="First Name"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('firstName', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[1] && styles.invalid]}
          borderColor={this.state.fieldValidities[1] ? 'green' : 'grey'}
          borderWidth={2}
          placeholder="Last Name"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('lastName', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[2] && styles.invalid]}
          borderColor={this.state.fieldValidities[2] ? 'green' : 'grey'}
          borderWidth={2}
          placeholder="Email Address"
          placeholderTextColor="rgba(255,255,255,0.5)"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('email', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[3] && styles.invalid]}
          borderColor={this.state.fieldValidities[3] ? 'green' : 'grey'}
          borderWidth={2}
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="none"
          returnKeyType="next"
          secureTextEntry={true}
          onChangeText={(text) => this.verifyInput('password', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[4] && styles.invalid]}
          borderColor={this.state.fieldValidities[4] ? 'green' : 'grey'}
          borderWidth={2}
          placeholder="Re-enter Password"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="none"
          returnKeyType="next"
          secureTextEntry={true}
          onChangeText={(text) => this.verifyInput('passwordVerification', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[5] && styles.invalid]}
          borderColor={this.state.fieldValidities[5] ? 'green' : 'grey'}
          borderWidth={2}
          placeholder="Street Address"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('address', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[6] && styles.invalid]}
          borderColor={this.state.fieldValidities[6] ? 'green' : 'grey'}
          borderWidth={2}
          placeholder="City"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('city', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[7] && styles.invalid]}
          borderColor={this.state.fieldValidities[7] ? 'green' : 'grey'}
          borderWidth={2}
          placeholder="State"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="characters"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('state', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[8] && styles.invalid]}
          borderColor={this.state.fieldValidities[8] ? 'green' : 'grey'}
          borderWidth={2}
          placeholder="Zip"
          placeholderTextColor="rgba(255,255,255,0.5)"
          keyboardType="numeric"
          returnKeyType="done"
          onChangeText={(text) => this.verifyInput('zip', text)}
        />
        <Text>{this.state.submitReport}</Text>
        <TouchableHighlight style={styles.buttonContainer} onPress={this.submitRegistration} disabled={!this.state.allValid}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableHighlight>
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

  submitRegistration() {
    fetch('http://138.68.56.236:3000/newUser', {
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
    .then((response) => response.json())
    .then((responseObject) => {
      if (responseObject.status === 'OK' || responseObject.status === 'okay')
        this.submitLogin();
      else
        this.setState({submitReport: 'Registration failed!'});
    });
  }

  submitLogin() {
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
    .then((response) => response.json())
    .then((responseObject) => {
      if (typeof responseObject.token === 'string') {
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
    backgroundColor:'rgb(52,152,219)',
    padding: 30
  },
  field: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginTop:15,
    color: '#FFF',
    paddingHorizontal: 10,
    borderColor:'black',
    borderWidth: 1
  },
  invalid: {
    borderColor: 'grey'
  },
  buttonContainer: {
    backgroundColor: 'rgb(31,58,147)',
    paddingVertical: 15,
    marginTop:42,
    justifyContent:'flex-end'
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700',
    fontSize: 20
  },
  text: {
    textAlign: 'center',
    color: 'white',
    marginTop: 25,
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 15
  },
  borderWidth:{
    borderWidth:1
  }
});