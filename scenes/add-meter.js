// add-meter.js
// Flow

import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, TextInput, Text, TouchableHighlight, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class AddMeter extends Component {

  static get propTypes() {
    return {
      finishAction: React.PropTypes.func
    };
  }

  constructor(props) {
    super(props);
    // Initialize state variables
    this.state = {
      meterName: '',
      SSID: '',
      password: '',
      fieldValidities: [false, false, false],
      allValid: false,
      submitReport: ''
    };

    fetch('http://138.68.56.236:3000/api/getNextMeterId', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
    .then((response) => {
      switch (response.status) {
        case 200:
          response.json().then((responseObject) => this.setState({meterId: responseObject.nextId}));
          break;
        default:
          response.json().then((responseObject) => this.setState({submitReport: `Failed to send info to meter: ${responseObject.message}`}));
      }
    });

    // Bind functions to instance
    this.verifyInput = this.verifyInput.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
    this.submitToServer = this.submitToServer.bind(this);
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.text}>Add a Meter</Text>
        <TextInput style={[styles.field, !this.state.fieldValidities[0] && styles.invalid]}
          borderColor={this.state.fieldValidities[0] ? 'green' : 'grey'}
          placeholder="New Meter Name"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('meterName', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[1] && styles.invalid]}
          borderColor={this.state.fieldValidities[1] ? 'green' : 'grey'}
          placeholder="SSID"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(text) => this.verifyInput('SSID', text)}
        />
        <TextInput style={[styles.field, !this.state.fieldValidities[2] && styles.invalid]}
          borderColor={this.state.fieldValidities[2] ? 'green' : 'grey'}
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoCapitalize="none"
          returnKeyType="done"
          secureTextEntry={true}
          onChangeText={(text) => this.verifyInput('password', text)}
        />
        <Text>{this.state.submitReport}</Text>
        <TouchableHighlight style={styles.buttonContainer} onPress={this.submitToServer} disabled={!this.state.allValid}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableHighlight>
      </KeyboardAwareScrollView>
    );
  }

  verifyInput(name, text) {
    switch (name) {
      case 'meterName':
        this.setState((prevState) => {
          let newValidities = prevState.fieldValidities;
          newValidities[0] = /^[A-Z' \-]{1,20}$/i.test(text);
          return {fieldValidities: newValidities};
        });
        break;
      case 'SSID':
        this.setState((prevState) => {
          let newValidities = prevState.fieldValidities;
          newValidities[1] = /^.{1,20}$/i.test(text);
          return {fieldValidities: newValidities};
        });
        break;
      case 'password':
        this.setState((prevState) => {
          let newValidities = prevState.fieldValidities;
          newValidities[2] = /^([ -~]{8,63}|[ -~]{5})$/i.test(text); //WPA passphrases: 8-63 ASCII-printable chars, WEP: 5 or 13 chars
          return {fieldValidities: newValidities};
        });
        break;
    }

    this.setState({
      allValid: this.state.fieldValidities.every((value) => value === true),
      [name]: text
    });
  }

  submitToServer(isRetrying) {
    fetch('http://138.68.56.236:3000/api/addMeter', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        meterId: this.state.meterId,
        meterName: this.state.meterName
      })
    })
    .then((response) => {
      switch (response.status) {
        case 200:
          this.submitToMeter();
          break;
        case 409:
          if (!isRetrying) {
            response.json().then((responseObject) => {
              this.setState({meterId: responseObject.nextId}, this.submitToServer(true));
            });
            break;
          }
          // else, fall through, so we only retry once.
        default:
          response.json().then((responseObject) => this.setState({ submitReport: `Login failed: ${responseObject.message}` }));
      }
    });
  }

  submitToMeter() {
    fetch('METER ADDRESS HERE', { //TODO: Put a real address here
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        meterId: this.state.meterId,
        meterName: this.state.meterName,
        SSID: this.state.SSID,
        password: this.state.password
      })
    })
    .then((response) => {
      switch (response.status) {
        case 200:
          response.json().then((responseObject) => {
            Alert.alert('Meter Added!');
            if (typeof this.props.finishAction === 'function') {
              this.props.finishAction();
            }
          });
          break;
        default:
          response.json().then((responseObject) => this.setState({submitReport: `Failed to send info to meter: ${responseObject.message}`}));
      }
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'rgb(52,152,219)',
    paddingHorizontal: 30
  },
  field: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginTop:15,
    color: '#FFF',
    paddingHorizontal: 10,
    borderColor:'black',
    borderWidth: 1
  },
  invalid: {
    borderColor: 'grey'
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
  text: {
    textAlign: 'center',
    color: 'white',
    marginTop: 25,
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 15
  }
});
