import React, { Component } from 'react';
import { StyleSheet, ScrollView, TextInput, Button, Text } from 'react-native';

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
      submitReport: ''
    }

    this.verifyInput= this.verifyInput.bind(this);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
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
          onChangeText={(text) => this.verifyInput('Email Address:', text)}
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
        <Button title="Submit" onPress={() => {
          this.setState({submitReport: 'Submitted! Thanks, ' + this.state.firstName + '!'});
        }} />
        <Text>{this.state.submitReport}</Text>

        
      </ScrollView>
    )
  }

  verifyInput(name, text) {
   let msg = '';

    if (name === 'zip') {
      let zipPatt = /^\d{5}(-\d{4})?$/
      msg = (zipPatt.test(text)) ? 'Nice job, good zip!\n' : 'Failure! Bad zip.\n';
    }

    this.setState({submitReport: msg});
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