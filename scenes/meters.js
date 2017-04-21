// meters.js
// Flow

import React, { Component } from 'react';
import { StyleSheet, Text, Alert, View, TouchableHighlight, Navigator, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalDropdown from 'react-native-modal-dropdown';

export default class Meters extends Component {

  static get propTypes() {
    return {
      pushRoute: React.PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);

    // Initialize state variables
    this.state = {
      meterList: [],
      submitReport: ''
    };

    this.dropdownRenderRow = this.dropdownRenderRow.bind(this);
    this.addMeter = this.addMeter.bind(this);
    this.dropMeter = this.dropMeter.bind(this);
    this.viewMeter = this.viewMeter.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('token', (errors, token) => {
      if (errors) {
        Alert.alert('Error', errors);
      }

      fetch('http://138.68.56.236:3000/api/getMeterIdList', {
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
              let {meterIds} = responseObject;

              if (!Array.isArray(meterIds)) {
                this.setState({
                  submitReport: 'Failed to retrieve meter ID list - server returned invalid response!',
                  meterList: []
                });
                return;
              }

              let meterList = [];
              for (let i = 0; i < meterIds.length; i++) {
                meterList[i] = meterIds[i].meterId;
              }

              this.setState({submitReport: '', meterList});
            });
            break;
          default:
            response.json().then((responseObject) => {
              this.setState({
                submitReport: `${response.status}: ${responseObject.message}`,
                meterList: []
              });
            });
        }
      });
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.title}>Meters</Text>
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
          defaultValue='Drop A Meter'
          renderRow={this.dropdownRenderRow}
          onSelect={this.dropMeter}
        />
        <TouchableHighlight style={styles.buttonContainer} onPress={this.addMeter}>
          <Text style={styles.buttonText}>Add a Meter</Text>
        </TouchableHighlight>
      </KeyboardAwareScrollView>
    );
  }

  dropdownRenderRow(rowData, rowID, highlighted) {
    let evenRow = rowID % 2;
    return (
      <TouchableHighlight underlayColor='cornflowerblue'>
       <View style={[styles.dropdownRow, {backgroundColor: evenRow ? 'rgb(31,58,147)' : 'rgb(31,58,147)'}]}>
          <Text style={[styles.dropdownRowText, highlighted && {color: 'white'}]}>
             {`Meter ${rowData}`}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  viewMeter(index, value) {
    this.props.pushRoute({
      name: 'meterGraphs',
      passProps: {meterId: value},
      sceneConfig: Navigator.SceneConfigs.PushFromRight
    });
  }

  addMeter() {
    this.props.pushRoute({name: 'addMeter'});
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
  buttonContainer: {
    backgroundColor: 'rgb(31,58,147)',
    paddingVertical: 15,
    marginTop:42,
    justifyContent:'center'
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700',
    fontSize: 20
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
