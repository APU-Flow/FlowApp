import React, { Component } from 'react';
import { StyleSheet, TextInput, Navigator, Button, Text, Alert, View, TouchableOpacity, TouchableHighlight, ScrollView, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SideMenu }  from 'react-native-side-menu';
import ModalDropdown from 'react-native-modal-dropdown';

//this file is the change account screen with a switch to account, account settings,
//and deleting my account.

//Still need to add registered users to this page, as well as who they are logged in as
const onButtonPress1 = () => {
  //Alert.alert('Are you sure you want to delete your data history?');
  Alert.alert(
  'Delete Account',
  'Are you sure you want to delete your account?',
  [
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'Yes, Delete my account', onPress: () => console.log('OK Pressed')},
  ],
  { cancelable: false }
)
};
const onButtonPress2 = () => {
  Alert.alert('Contact Us at www.flow.org');
};
const FIRST_DROPDOWN = ['Jim', 'Bill'];
const SECOND_DROPDOWN = ['I', 'Am', 'Unsure'];// i Don't know what should be in this dropdown (for account settings)

export default class ChangeAccount extends Component {
  static get defaultProps() {
    return {
      title: 'Change Account'
    };
  }

  render() {
    return (
     <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.title}>
          Change Account
        </Text>
        <Text style={styles.account}>
          You're currently logged in as...
        </Text>
            <ModalDropdown style={styles.dropdown}
              options={FIRST_DROPDOWN}
              textStyle={styles.dropdown_text}
              dropdownStyle={styles.dropdown_dropdown}
              defaultValue='Switch to Which Account?'
              renderRow={this.dropdown_renderRow.bind(this)}             
            />
            <ModalDropdown style={styles.dropdown}
              options={SECOND_DROPDOWN}
              textStyle={styles.dropdown_text}
              dropdownStyle={styles.dropdown_dropdown}
              defaultValue='Account Settings'
              renderRow={this.dropdown_renderRow.bind(this)}             
            /> 
              <TouchableHighlight onPress={onButtonPress1}>
                <View style={styles.dropdown}>
                  <Text style={styles.dropdown_text}>
                    Delete My Account
                  </Text>
                </View>
             </TouchableHighlight>
      </KeyboardAwareScrollView>
    )
  }
   dropdown_renderRow(rowData, rowID, highlighted) {
    let evenRow = rowID % 2;
    return (
      <TouchableHighlight underlayColor='cornflowerblue'>
        <View style={[styles.dropdown_row, {backgroundColor: evenRow ? 'lemonchiffon' : 'white'}]}>
          <Text style={[styles.dropdown_row_text, highlighted && {color: 'mediumaquamarine'}]}>
             {`${rowData}`}
          </Text>
        </View>
      </TouchableHighlight>
    );
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
    backgroundColor: '#F0F8FF',
    color: 'rgb(52, 152, 219)'
  },
  field: {
    fontSize: 14,
    textAlign: 'center',
    borderColor: 'black'
  },
  account: {
    fontSize: 20,
    textAlign: 'center',
    borderColor: 'black'
  },
  invalid: {
    borderColor: 'red'
  },
  textButton: {
    color: 'deepskyblue',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'deepskyblue',
    margin: 2,
  },
  dropdown: {
    margin: 8,
    borderColor:  'rgb(52, 152, 219)',
    backgroundColor:  'rgb(52, 152, 219)',
    borderWidth: 1,
    borderRadius: 1,
  },
  dropdown_text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
   dropdown_dropdown: {
    margin: 8,
    width: 320,
    height: 100,
    borderColor: 'rgb(52, 152, 219)',
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: 'white'
  },


  dropdown_row: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    backgroundColor: 'rgb(52, 152, 219)'
  },

  dropdown_row_text: {
    marginHorizontal: 4,
    fontSize: 16,
    color: 'rgb(52, 152, 219)',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  dropdown_separator: {
    height: 1,
    backgroundColor: 'cornflowerblue',
  },
});