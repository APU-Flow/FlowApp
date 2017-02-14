// overview.js
// Flow

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
    // Initialize state variables 
    this.state = {
      
    }
    
    // Bind functions to instance
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Stuff will go here!</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor:'rgb(52,152,219)'
  }
});