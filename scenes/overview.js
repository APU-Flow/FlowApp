// overview.js
// Flow

import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Overview extends Component {
  
  static get defaultProps() {
    return {
      // This component should always be given a navigator property. When it isn't, log this error.
      navigator: { push: (name) => {
        console.log(`Error navigating to ${name ? name : 'next'} scene! No navigator given to Login scene!`);
      }},
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
    let email = (this.props.email) ? this.props.email : null;
    // let now = new Date();
    // let hourAgo = new Date();
    // hourAgo.setHours(hourAgo.getHours()-1);
    fetch(`http://138.68.56.236:3000/getUsageEvent?email=${encodeURI(email)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((response) => response.text())
    .then((responseText) => {
      this.setState({ data: responseText });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.message}</Text>
        <Text>{this.state.data}</Text>
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