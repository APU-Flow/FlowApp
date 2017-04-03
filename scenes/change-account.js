// change-account.js
// Flow

import React, { Component } from 'react';
import { StyleSheet, Text, Alert, View, TouchableHighlight } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalDropdown from 'react-native-modal-dropdown';

export default class ChangeAccount extends Component {

  static get propTypes() {
    return { title: React.PropTypes.string };
  }

  static get defaultProps() {
    return {
      title: 'Change Account'
    };
  }

  constructor(props) {
    super(props);

    // Initialize state variables
    this.state = {
      // TODO: Populate these with real data
      switchableAccounts: ['Jim', 'Bill'],
      settingsOptions: ['I', 'Am', 'Unsure', 'What', 'Should', 'Be', 'Here']
    };

    this.dropdownRenderRow = this.dropdownRenderRow.bind(this);
    this.confirmDeleteAccount = this.confirmDeleteAccount.bind(this);
  }

  render() {
    return (
     <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.text}>You're currently logged in as...</Text>
        <ModalDropdown style={styles.dropdown}
          options={this.state.switchableAccounts}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownDropdown}
          defaultValue='Switch to Which Account?'
          renderRow={this.dropdownRenderRow}
        />
        <ModalDropdown style={styles.dropdown}
          options={this.state.settingsOptions}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownDropdown}
          defaultValue='Account Settings'
          renderRow={this.dropdownRenderRow}
        />
        <TouchableHighlight onPress={this.confirmDeleteAccount}>
          <View style={styles.dropdown}>
            <Text style={styles.dropdownText}>Delete My Account</Text>
          </View>
        </TouchableHighlight>
      </KeyboardAwareScrollView>
    );
  }

  dropdownRenderRow(rowData, rowID, highlighted) {
    let evenRow = rowID % 2;
    return (
      <TouchableHighlight underlayColor='#6495ED'>
        <View style={[styles.dropdownRow, {backgroundColor: evenRow ? '#87CEEB' : '#87CEFA'}]}>
          <Text style={styles.dropdownRowText}>{rowData}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  confirmDeleteAccount() {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {text: 'Cancel', onPress: null, style: 'cancel' },
        {text: 'Yes, Delete my account', onPress: null},
      ],
      { cancelable: false }
    );
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
  text: {
    textAlign: 'center',
    color: 'white',
    marginTop: 5,
    fontSize: 18,
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
  dropdownDropdown: {
    margin: 8,
    width: 320,
    height: 100,
    borderColor: 'rgb(31,58,147)',
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: 'rgb(31,58,147)',
  },
  dropdownRow: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    backgroundColor: 'rgb(31,58,147)'
  },
  dropdownRowText: {
    marginHorizontal: 4,
    fontSize: 16,
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
  }
});
