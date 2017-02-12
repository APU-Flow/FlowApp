import React, { Component } from 'react';
import { StyleSheet, TextInput, Button, Text, Alert, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SideMenu }  from 'react-native-side-menu';

//this file is the overview screen with a main menu, overview,
//and hopefully presents what the graphs class does.
const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};
export default class Overview extends Component {
  static get defaultProps() {
    return {
      title: 'Overview'
    };
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