// register.js
// Flow

import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, TextInput, Text, TouchableHighlight, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Register extends Component {

  static get propTypes() {
    return {
      pushRoute: React.PropTypes.func.isRequired
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
    };

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
          placeholder="First Name"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('firstName', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[1] && styles.invalid]}
          borderColor={this.state.fieldValidities[1] ? 'green' : 'grey'}
          placeholder="Last Name"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('lastName', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[2] && styles.invalid]}
          borderColor={this.state.fieldValidities[2] ? 'green' : 'grey'}
          placeholder="Email Address"
          placeholderTextColor="rgba(255,255,255,0.5)"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('email', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[3] && styles.invalid]}
          borderColor={this.state.fieldValidities[3] ? 'green' : 'grey'}
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="none"
          returnKeyType="next"
          secureTextEntry={true}
          onChangeText={(text) => this.verifyInput('password', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[4] && styles.invalid]}
          borderColor={this.state.fieldValidities[4] ? 'green' : 'grey'}
          placeholder="Re-enter Password"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="none"
          returnKeyType="next"
          secureTextEntry={true}
          onChangeText={(text) => this.verifyInput('passwordVerification', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[5] && styles.invalid]}
          borderColor={this.state.fieldValidities[5] ? 'green' : 'grey'}
          placeholder="Street Address"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('address', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[6] && styles.invalid]}
          borderColor={this.state.fieldValidities[6] ? 'green' : 'grey'}
          placeholder="City"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('city', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[7] && styles.invalid]}
          borderColor={this.state.fieldValidities[7] ? 'green' : 'grey'}
          placeholder="State"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="characters"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('state', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[8] && styles.invalid]}
          borderColor={this.state.fieldValidities[8] ? 'green' : 'grey'}
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
    );
  }

  verifyInput(name, text) {
    switch (name) {
      case 'firstName':
        this.setState((prevState) => {
          let newValidities = prevState.fieldValidities;
          newValidities[0] = /^[A-Z' \-]{1,20}$/i.test(text);
          return {fieldValidities: newValidities};
        });
        break;
      case 'lastName':
        this.setState((prevState) => {
          let newValidities = prevState.fieldValidities;
          newValidities[1] = (/^[A-Z'\-]{1,20}$/i.test(text));
          return {fieldValidities: newValidities};
        });
        break;
      case 'email':
        this.setState((prevState) => {
          let newValidities = prevState.fieldValidities;
          newValidities[2] = (/^[A-Z0-9._\-%+]{1,20}@[A-Z0-9\-.]{1,20}\.[A-Z]{2,4}$/i.test(text));
          return {fieldValidities: newValidities};
        });
        break;
      case 'password':
        this.setState((prevState) => {
          let newValidities = prevState.fieldValidities;
          newValidities[3] = (/^[A-Z0-9`~!@#$%^&*()\-=_+<>,.?]{5,20}$/i.test(text));
          return {fieldValidities: newValidities};
        });
        // Falls through to update passsword verification styles when password changes
      case 'passwordVerification':
        this.setState((prevState) => {
          let newValidities = prevState.fieldValidities;
          newValidities[4] = (text == this.state.password);
          return {fieldValidities: newValidities};
        });
        break;
      case 'address':
        this.setState((prevState) => {
          let newValidities = prevState.fieldValidities;
          newValidities[5] = (/^[0-9]{1,8} [A-Z'#.& \-]{2,30}$/i.test(text));
          return {fieldValidities: newValidities};
        });
        break;
      case 'city':
        this.setState((prevState) => {
          let newValidities = prevState.fieldValidities;
          newValidities[6] = (/^[A-Z' \-]{2,25}$/i.test(text));
          return {fieldValidities: newValidities};
        });
        break;
      case 'state':
        this.setState((prevState) => {
          let newValidities = prevState.fieldValidities;
          newValidities[7] = (/^[A-Z]{2}$/.test(text));
          return {fieldValidities: newValidities};
        });
        break;
      case 'zip':
        this.setState((prevState) => {
          let newValidities = prevState.fieldValidities;
          newValidities[8] = (/^\d{5}(-\d{4})?$/.test(text));
          return {fieldValidities: newValidities};
        });
        break;
    }

    this.setState({allValid: this.state.fieldValidities.every((value) => value === true)});

    this.setState({[name]: text});
  }

  submitRegistration() {
    fetch('http://138.68.56.236:3001/newUser', {
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
      if (responseObject.status === 'ok')
        this.submitLogin();
      else
        this.setState({submitReport: 'Registration failed!'});
    });
  }

  submitLogin() {
    fetch('http://138.68.56.236:3001/login', {
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
    .then(async (responseObject) => {
      if (typeof responseObject.token === 'string') {
        this.setState({ submitReport: '' });
        
        try {
          // TODO: Handle undefined instead of hanging!
          await AsyncStorage.multiSet([
            ['email', responseObject.email],
            ['firstName', responseObject.firstName],
            ['token', responseObject.token]
          ]);
        } catch (error) {
          Alert.alert('Error', error);
        }

        this.props.pushRoute({ name: 'overview', passProps: {message: JSON.stringify(responseObject)} });
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
    paddingHorizontal: 30
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
    justifyContent:'center'
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
  }
});