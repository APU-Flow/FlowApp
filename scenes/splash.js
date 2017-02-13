// splash.js
// Flow

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Splash extends Component {
  
  // Define default loadNextScene prop - this is only for when this element is used
  // improperly elsewhere in our code, but it'll be an easier error to debug this way.
  static get defaultProps() {
    return {
      loadNextScene: () => this.setState({ message: 'Error loading next scene; no loadNextScene method given!' })
    };
  }

  // Initialize message state variable so the Text field doesn't get mad. 
  constructor(props) {
    super(props);
    this.state = { message: '' }
  }

  // TEMP!! Set a timer to leave the splash screen up for 3 seconds (just so we can see it / debug)
  componentDidMount() {
    this.state.timer = setTimeout(this.props.loadNextScene, 3000);
  }
  // Clear the timer if the component is unmounted before the timer is up, so the timer doesn't leak
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  
  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>FLOW</Text>
        <Text style={styles.message}>{this.state.message}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgb(52, 152, 219)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 45,
    fontWeight: 'bold',
    paddingBottom: 40
  },
  message: {
    color: 'white',
    fontSize: 14,
    paddingTop: 50
  }
});
