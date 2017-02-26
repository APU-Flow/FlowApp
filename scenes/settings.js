import React, { Component } from 'react';
import { StyleSheet, TextInput, Navigator, Button, Text, Alert, View, TouchableOpacity, TouchableHighlight, ScrollView, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SideMenu }  from 'react-native-side-menu';
import ModalDropdown from 'react-native-modal-dropdown';

//this file is the settings screen with options to logout, go to change account page, 
//delete data history, or view contact info


export default class Settings extends Component {
  static get defaultProps() {
    return {
      title: 'Settings'
    };
  }
  

  render() {
    return (
     <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.title}>
          Settings
        </Text>
            <ModalDropdown style={styles.dropdown}
              options={FIRST_DROPDOWN}
              textStyle={styles.dropdownText}
              dropdownStyle={styles.dropdownDropdown}
              defaultValue='Logout or Change Account'
              renderRow={this.dropdownRenderRow.bind(this)}             
            /> 
             <ModalDropdown style={styles.dropdown}
              options={SECOND_DROPDOWN}
              textStyle={styles.dropdownText}
              dropdownStyle={styles.dropdownDropdown}
              defaultValue='Add/Drop User?' //not sure what this add/drop is supposed to be
              renderRow={this.dropdownRenderRow.bind(this)}             
            />
             <TouchableHighlight onPress={onButtonPress1}>
                <View style={styles.dropdown}>
                  <Text style={styles.dropdownText}>
                    Delete Data History
                  </Text>
                </View>
             </TouchableHighlight>

              <TouchableHighlight onPress={onButtonPress2}>
                <View style={styles.dropdown}>
                  <Text style={styles.dropdownText}>
                    Contact Us
                  </Text>
                </View>
             </TouchableHighlight>
      </KeyboardAwareScrollView>
    )
  }
   dropdownRenderRow(rowData, rowID, highlighted) {
    let evenRow = rowID % 2;
    return (
      <TouchableHighlight underlayColor='cornflowerblue'>
        <View style={[styles.dropdownRow, {backgroundColor: evenRow ? 'lemonchiffon' : 'white'}]}>
          <Text style={[styles.dropdownRowText, highlighted && {color: 'mediumaquamarine'}]}>
             {`${rowData}`}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const onButtonPress1 = () => {
  //Alert.alert('Are you sure you want to delete your data history?');
  Alert.alert(
  'Delete Data History',
  'Are you sure you want to delete your data history?',
  [
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'Yes', onPress: () => console.log('Yes Pressed')},
  ],
  { cancelable: false }
)
};
const onButtonPress2 = () => {
  Alert.alert('Contact Us at www.flow.org');
};
const FIRST_DROPDOWN = ['Logout', 'Change Account'];
const SECOND_DROPDOWN = ['Add', 'Drop'];


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
    borderColor: 'rgb(52, 152, 219)',
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: 'white'
  },


  dropdownRow: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    backgroundColor: 'rgb(52, 152, 219)'
  },

  dropdownRowText: {
    marginHorizontal: 4,
    fontSize: 16,
    color: 'rgb(52, 152, 219)',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  dropdownSeparator: {
    height: 1,
    backgroundColor: 'cornflowerblue',
  },
});
