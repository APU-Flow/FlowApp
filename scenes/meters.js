// meters.js
// Flow

import React, { Component } from 'react';
import { StyleSheet, Text, Alert, View, TouchableHighlight } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalDropdown from 'react-native-modal-dropdown';

export default class Meters extends Component {

  static get propTypes() {
    return {
      title: React.PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      title: 'Meters'
    };
  }

  constructor(props) {
    super(props);

    // Initialize state variables
    this.state = {
      meterList: ['Meter 1', 'Meter 2', 'Meter 3']
    };

    this.dropdownRenderRow = this.dropdownRenderRow.bind(this);
    this.viewMeter = this.viewMeter.bind(this);
    this.addMeter = this.addMeter.bind(this);
    this.dropMeter = this.dropMeter.bind(this);
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <ModalDropdown style={styles.dropdown}
          options={this.state.meterList}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownDropdown}
          defaultValue='Device Overview'
          renderRow={this.dropdownRenderRow}
          onSelect={this.viewMeter}
        />
        <ModalDropdown style={styles.dropdown}
          options={this.state.meterList}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownDropdown}
          defaultValue='Add A Meter'
          renderRow={this.dropdownRenderRow}
          onSelect={this.addMeter}
        />
        <ModalDropdown style={styles.dropdown}
          options={this.state.meterList}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownDropdown}
          defaultValue='Drop A Meter'
          renderRow={this.dropdownRenderRow}
          onSelect={this.dropMeter}
        />
      </KeyboardAwareScrollView>
    );
  }

  dropdownRenderRow(rowData, rowID, highlighted) {
    let evenRow = rowID % 2;
    return (
      <TouchableHighlight underlayColor='cornflowerblue'>
       <View style={[styles.dropdownRow, {backgroundColor: evenRow ? 'rgb(31,58,147)' : 'rgb(31,58,147)'}]}>
          <Text style={[styles.dropdownRowText, highlighted && {color: 'white'}]}>
             {rowData}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  viewMeter(index, value) {
    Alert.alert(value, `Taking you to ${value} overview screen.`);
    return false; //this turns the selected option back to the original
  }

  addMeter(index, value) {
    Alert.alert(
      value,
      'Are you sure this is the meter you would like to add?',
      [
        {text: 'Cancel', onPress: () => Alert.alert('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => Alert.alert('Drop Meter', `${value} was added.`)},
      ],
      { cancelable: false }
    );
    return false; //this turns the selected option back to the original
  }

  dropMeter(index, value) {
    Alert.alert(
      `${value}`,
      'Are you sure you want to drop this meter?',
      [
        {text: 'Cancel', onPress: () => Alert.alert('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => Alert.alert('Drop Meter', `${value} was dropped.`)},
      ],
      { cancelable: false }
    );
    return false; //this turns the selected option back to the original
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
