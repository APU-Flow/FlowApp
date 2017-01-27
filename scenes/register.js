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
      zip: ''
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>{this.state.firstName}</Text>
        <TextInput style={styles.field}
          placeholder="First Name:"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(input) => this.setState({firstName: input})}
        />
        <Text>{this.state.lastName}</Text>
        <TextInput style={styles.field}
          placeholder="Last Name:"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(input) => this.setState({lastName: input})}
        />
        <Text>{this.state.email}</Text>
        <TextInput style={styles.field}
          placeholder="Email Address:"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(input) => this.setState({email: input})}
        />
        <Text>{this.state.password}</Text>
        <TextInput style={styles.field}
          placeholder="Password:"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(input) => this.setState({password: input})}
          //secureTextEntry="true"
        />
        <Text>{this.state.passwordVerification}</Text>
        <TextInput style={styles.field}
          placeholder="Re-enter Password:"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(input) => this.setState({passwordVerification: input})}
          //secureTextEntry="true"
        />
        <Text>{this.state.address}</Text>
        <TextInput style={styles.field}
          placeholder="Street Address:"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(input) => this.setState({address: input})}
        />
        <Text>{this.state.city}</Text>
        <TextInput style={styles.field}
          placeholder="City:"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(input) => this.setState({city: input})}
        />
        <Text>{this.state.state}</Text>
        <TextInput style={styles.field}
          placeholder="State:"
          autoCapitalize="characters"
          returnKeyType="next"
          onChangeText={(input) => this.setState({state: input})}
        />
        <Text>{this.state.zip}</Text>
        <TextInput style={styles.field}
          placeholder="Zip:"
          keyboardType="numeric"
          returnKeyType="done"
          onChangeText={(input) => this.setState({zip: input})}
        />
        <Button title="Submit" onPress={() => console.log('Yo, button pressed!')} />
      </ScrollView>
    )
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