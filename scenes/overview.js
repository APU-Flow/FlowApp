import React, { Component } from 'react';
import { StyleSheet, TextInput, Button, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Overview extends Component {
  static get defaultProps() {
    return {
      title: 'Overview'
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
      fieldValidities: [false, false, false, false, false, false, false, false, false],
      allValid: false
    }

    this.verifyInput = this.verifyInput.bind(this);
    this.submitToServer = this.submitToServer.bind(this);
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <TextInput style={[styles.field, !this.state.fieldValidities[0] && styles.invalid]}
          underlineColorAndroid={this.state.fieldValidities[0] ? 'black' : 'red'}
          placeholder="First Name"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('firstName', text)}
        />
        <Text>First Name{'\n'}</Text>
        <TextInput style={[styles.field, !this.state.fieldValidities[1] && styles.invalid]}
          underlineColorAndroid={this.state.fieldValidities[1] ? 'black' : 'red'}
          placeholder="Last Name"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('lastName', text)}
        />
        <Text>Last Name{'\n'}</Text>
        <TextInput style={[styles.field, !this.state.fieldValidities[2] && styles.invalid]}
          underlineColorAndroid={this.state.fieldValidities[2] ? 'black' : 'red'}
          placeholder="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('email', text)}
        />
        <Text>Email Address{'\n'}</Text>
        <TextInput style={[styles.field, !this.state.fieldValidities[3] && styles.invalid]}
          underlineColorAndroid={this.state.fieldValidities[3] ? 'black' : 'red'}
          placeholder="Password"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('password', text)}
        />
        <Text>Password{'\n'}</Text>
        <TextInput style={[styles.field, !this.state.fieldValidities[4] && styles.invalid]}
          underlineColorAndroid={this.state.fieldValidities[4] ? 'black' : 'red'}
          placeholder="Re-enter Password"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('passwordVerification', text)}
        />
        <Text>Re-enter Password{'\n'}</Text>
        <TextInput style={[styles.field, !this.state.fieldValidities[5] && styles.invalid]}
          underlineColorAndroid={this.state.fieldValidities[5] ? 'black' : 'red'}
          placeholder="Street Address"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('address', text)}
        />
        <Text>Street Address{'\n'}</Text>
        <TextInput style={[styles.field, !this.state.fieldValidities[6] && styles.invalid]}
          underlineColorAndroid={this.state.fieldValidities[6] ? 'black' : 'red'}
          placeholder="City"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('city', text)}
        />
        <Text>City{'\n'}</Text>
        <TextInput style={[styles.field, !this.state.fieldValidities[7] && styles.invalid]}
          underlineColorAndroid={this.state.fieldValidities[7] ? 'black' : 'red'}
          placeholder="State"
          autoCapitalize="characters"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('state', text)}
        />
        <Text>State{'\n'}</Text>
        <TextInput style={[styles.field, !this.state.fieldValidities[8] && styles.invalid]}
          underlineColorAndroid={this.state.fieldValidities[8] ? 'black' : 'red'}
          placeholder="Zip"
          keyboardType="numeric"
          returnKeyType="done"
          onChangeText={(text) => this.verifyInput('zip', text)}
        />
        <Text>Zip{'\n'}</Text>
        <Button title="Submit" onPress={this.submitToServer} disabled={!this.state.allValid}/>
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
        //Intentional lack of 'break;' to update passsword verification styles when password changes
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
    backgroundColor: '#F0F8FF'
  },
  field: {
    fontSize: 14,
    textAlign: 'left',
    borderColor: 'black'
  },
  invalid: {
    borderColor: 'red'
  }
});