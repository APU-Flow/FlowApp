import React, { Component } from 'react';
import { View, TextInput, Navigator, StyleSheet } from 'react-native';

export default class Register extends Component {
  static get defaultProps() {
    return {
      title: 'Register'
    };
  }
// email address, password, password verification, name, and address. 
  render() {
    return (
      <View>
        <TextInput style={styles.field}
          placeholder='First Name:'
          autoCapitalize='words'
          returnKeyType='next'
          onChangeText={(input) => this.setState({firstName: input})}
        />
        <TextInput style={styles.field}
          placeholder='Last Name:'
          autoCapitalize='words'
          returnKeyType='next'
          onChangeText={(input) => this.setState({lastName: input})}
        />
        <TextInput style={styles.field}
          placeholder='Email Address:'
          keyboardType='email-address'
          autoCapitalize='none'
          returnKeyType='next'
          onChangeText={(input) => this.setState({email: input})}
        />
        <TextInput style={styles.field}
          placeholder='Password:'
          autoCapitalize='none'
          returnKeyType='next'
          onChangeText={(input) => this.setState({password: input})}
          //secureTextEntry='true'
        />
        <TextInput style={styles.field}
          placeholder='Re-enter Password:'
          autoCapitalize='none'
          returnKeyType='next'
          onChangeText={(input) => this.setState({passwordVerification: input})}
          //secureTextEntry='true'
        />
        <TextInput style={styles.field}
          placeholder='Street Address:'
          autoCapitalize='words'
          returnKeyType='next'
          onChangeText={(input) => this.setState({address: input})}
        />
        <TextInput style={styles.field}
          placeholder='City:'
          autoCapitalize='words'
          returnKeyType='next'
          onChangeText={(input) => this.setState({city: input})}
        />
        <TextInput style={styles.field}
          placeholder='State:'
          autoCapitalize='characters'
          returnKeyType='next'
          onChangeText={(input) => this.setState({state: input})}
        />
        <TextInput style={styles.field}
          placeholder='Zip:'
          keyboardType='numeric'
          returnKeyType='done'
          onChangeText={(input) => this.setState({zip: input})}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF'
  },
  field: {
    fontSize: 14,
    textAlign: 'left'
  }
});