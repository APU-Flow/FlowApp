import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

export default class LoginForm extends Component{
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="username or email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          placeholderTextColor="rgba(255,255,255,0.7)"
          style={styles.input}
        />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    justifyContent:'flex-start'
  },
  input: {
    height:40, 
    backgroundColor:'rgba(255,255,255,0.2)',
    marginBottom:15,
    color:'#FFF', 
    paddingHorizontal:10
  },
  buttonContainer:{
    backgroundColor:'rgb(44,62,80)',
    paddingVertical:10
  },
  buttonText:{
    textAlign: 'center',
    color:'#FFFFFF'
  }
});
