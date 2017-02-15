// overview.js
// Flow

import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Overview extends Component {
  
  static get defaultProps() {
    return {
      message: 'Default message'
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
        <Text>{this.props.message}</Text>
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