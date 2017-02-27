// graphs.js
// Flow

import React, { Component } from 'react';
import { StyleSheet, TextInput, Button, Text, Alert, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//plan on being where graphs are made
const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};
export default class Graphs extends Component {
  static get defaultProps() {
    return {
      title: 'Graphs'
    };
  }

  constructor(props) {
    super(props);
    //Initialize state variables so the Text fields don't get mad. 
    this.state = {
      fieldValidities: [false, false, false, false, false, false, false, false, false],
      allValid: false
    }

    this.verifyInput = this.verifyInput.bind(this);
  }

  render() {
    return (
     <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.title}>
          Overview
        </Text>
        <Button title="Main Menu" onPress={onButtonPress} />
      </KeyboardAwareScrollView>
    )
  }

  verifyInput(name, text) {
    switch(name) {
    
    }

    this.setState({allValid: this.state.fieldValidities.every((value) => value === true)});

    this.setState({[name]: text});
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#F0F8FF'
  },
  title: {
    fontSize: 50,
    flexDirection: 'column',
    flex: 1,
     textAlign: 'center',
    backgroundColor: '#F0F8FF'
  },
  field: {
    fontSize: 14,
    textAlign: 'center',
    borderColor: 'black'
  },
  invalid: {
    borderColor: 'red'
  }
});