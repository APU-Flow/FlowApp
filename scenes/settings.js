// settings.js
// Flow

import React, { Component } from 'react';
import { StyleSheet, Text, Alert, ScrollView, View, TouchableHighlight, AsyncStorage } from 'react-native';

export default class Settings extends Component {

  static get propTypes() {
    return {
      logout: React.PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);

    //this.dropdownRenderRow = this.dropdownRenderRow.bind(this);
    this.confirmDeleteHistory = this.confirmDeleteHistory.bind(this);
    this.contactUs = this.contactUs.bind(this);
  }


  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        <TouchableHighlight onPress={this.props.logout}>
          <View style={styles.dropdown}>
            <Text style={styles.dropdownText}>Logout / Change Account</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.confirmDeleteHistory}>
          <View style={styles.dropdown}>
            <Text style={styles.dropdownText}>Delete Data History</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.contactUs}>
          <View style={styles.dropdown}>
            <Text style={styles.dropdownText}>Contact Us</Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
    );
  }


  confirmDeleteHistory() {
    Alert.alert(
      'Delete Data History',
      'Are you sure you want to delete your data history?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => {
          AsyncStorage.getItem('token', (err, token) => {
            if (err) {
              Alert.alert('Error', 'User login token missing!');
              return;
            }
            fetch('http://138.68.56.236:3000/api/deleteUserData', {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': token
              }
            })
            .then((response) => {
              switch (response.status) {
                case 200:
                  response.json().then((responseObject) => {
                    Alert.alert('Successful');
                  });
                  break;
                default:
                  response.json().then((responseObject) => Alert.alert('Failure', responseObject.message));
              }
            }); // End fetch() callbacks
          }); // End AsyncStorage getItem
        }} // End 'Yes' button function
      ],
      { cancelable: false }
    ); // End confirmation alert
  }

  contactUs() {
    Alert.alert('See more from the Flow Team:', 'https://github.com/APU-Flow');
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor:'rgb(52,152,219)',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    marginTop: 25,
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 15
  },

  dropdown: {
    margin: 8,
    borderColor:  'rgb(31,58,147)',
    backgroundColor: 'rgb(31,58,147)',
    borderWidth: 1,
    borderRadius: 1,
  },
  dropdownText: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
