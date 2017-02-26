import React, { Component } from 'react';
import { StyleSheet, TextInput, Navigator, Button, Text, Alert, View, TouchableOpacity, TouchableHighlight, ScrollView, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalDropdown from 'react-native-modal-dropdown';

//this file is the settings screen with options to logout, go to change account page, 
//delete data history, or view contact info


export default class Settings extends Component {
  static get defaultProps() {
    return {
      title: 'Settings'
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      dropdown1RenderRow: this.dropdownRenderRow.bind(this),
      dropdown2RenderRow: this.dropdownRenderRow.bind(this),
    };
  }


  render() {
    return (
     <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.text}>
          Settings
        </Text>
            <ModalDropdown style={styles.dropdown}
              options={FIRST_DROPDOWN}
              textStyle={styles.dropdownText}
              dropdownStyle={styles.dropdownDropdown}
              defaultValue='Logout or Change Account'
              renderRow={this.state.dropdown1RenderRow}           
            /> 
             <ModalDropdown style={styles.dropdown}
              options={SECOND_DROPDOWN}
              textStyle={styles.dropdownText}
              dropdownStyle={styles.dropdownDropdown}
              defaultValue='Add/Drop User?' //not sure what this add/drop is supposed to be
              renderRow={this.state.dropdown2RenderRow}              
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
        <View style={[styles.dropdownRow, {backgroundColor: evenRow ? 'rgb(31,58,147)' : 'rgb(31,58,147)'}]}>
          <Text style={[styles.dropdownRowText, highlighted && {color: 'white'}]}>
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
    backgroundColor:'rgb(52,152,219)',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    marginTop: 25,
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 15
  },
  smallerText: {
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
  },
});
