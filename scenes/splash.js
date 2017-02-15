// splash.js
// Flow

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Splash extends Component {
  
  static get defaultProps() {
    return {
      // This component should always be given a navigator property. When it isn't, log this error.
      navigator: { push: (name) => {
        this.setState({ message: `Error navigating to ${name ? name : 'next'} scene! No navigator given to Login scene!` });
      }},
      loadNextScene: (context) => context.props.navigator.push({ name: 'login' })
    };
  }

  // Initialize message state variable so the Text field doesn't get mad. 
  constructor(props) {
    super(props);
    this.state = { message: '' }
  }

  // TEMP!! Set a timer to leave the splash screen up for 3 seconds (just so we can see it / debug)
  componentDidMount() {
    this.state.timer = setTimeout(this.props.loadNextScene, 3000, this);
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
