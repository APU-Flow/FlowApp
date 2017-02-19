import React, { Component } from 'react';
import { StyleSheet, TextInput, Button, Text, Alert, View, TouchableOpacity, TouchableHighlight, ScrollView, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SideMenu }  from 'react-native-side-menu';
import ModalDropdown from 'react-native-modal-dropdown';

//this file is the meters scene which allows one to add or drop a specific meter
//needs a function to select the different meter pages within the dropdowns-done
//needs the default button to remain after an option is pressed.
FIRST_DROPDOWN = ['Meter 1', 'Meter 2'];
SECOND_DROPDOWN = ['Meter 1', 'Meter 2'];

export default class Meters extends Component {
  static get defaultProps() {
    return {
      title: 'Meters'
    };
  }

  render() {
    return (
     <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.title}>
          Meters
        </Text>
       <ModalDropdown style={styles.dropdown}
              options={FIRST_DROPDOWN}
              textStyle={styles.dropdown_text}
              dropdownStyle={styles.dropdown_dropdown}
              defaultValue='Add A Meter'
              renderRow={this.dropdown_renderRow.bind(this)} 
              onSelect={(idx, value) => this.onSelect1(idx, value)}       
            />
             <ModalDropdown style={styles.dropdown}
              options={SECOND_DROPDOWN}
              textStyle={styles.dropdown_text}
              dropdownStyle={styles.dropdown_dropdown}
              defaultValue='Drop A Meter'
              renderRow={this.dropdown_renderRow.bind(this)} 
              onSelect={(idx, value) => this.onSelect2(idx, value)}       
            />
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

  onSelect2(idx, value) {
    //alert(`idx=${idx}, value='${value}'`); //this is to let you know index and value for debugging
    Alert.alert(
      `${value}`,
      'Are you sure you want to drop this meter?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => Alert.alert('Drop Meter',`${value} was dropped.`)},
      ],
      { cancelable: false }
    )
    //re-do arrays at top with a key so you can remove individual indexes.
    console.debug(`idx=${idx}, value='${value}'`);
    return false; //this turns the select an option back to the original (drop a meter)
  }


  onSelect1(idx, value) {
    //alert(`idx=${idx}, value='${value}'`); //this is to let you know index and value for debugging
    Alert.alert(
      `${value}`,
      'Are you sure this is the meter you would like to add?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => Alert.alert('Drop Meter',`${value} was added.`)},
      ],
      { cancelable: false }
    )
    console.debug(`idx=${idx}, value='${value}'`);
    return false; //this turns the select an option back to the original (add a meter)
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