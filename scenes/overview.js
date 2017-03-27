// overview.js
// Flow
'use strict';

import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, Text } from 'react-native';

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
      data: ''
    }
  }

  componentDidMount() {
    AsyncStorage.multiGet(['email', 'token'], (errors, results) => {
      if (errors) {
        console.error(errors);
      }
      let email = results[0][1];
      let token = results[1][1];
      // let now = new Date();
      // let hourAgo = new Date();
      // hourAgo.setHours(hourAgo.getHours()-1);
      fetch(`http://138.68.56.236:3000/api/getUsageEvent?email=${encodeURI(email)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': token
        }
      })
      .then((response) => response.text())
      .then((responseText) => {
        this.setState({ data: responseText });
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.message}</Text>
        <Text style={styles.text}>{this.state.data}</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor:'rgb(52,152,219)'
  },
  text: {
    margin: 10,
    fontSize: 15
  }
});

module.exports = Overview;