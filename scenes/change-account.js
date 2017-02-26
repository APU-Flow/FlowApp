import React, { Component } from 'react';
import { StyleSheet, TextInput, Navigator, Button, Text, Alert, View, TouchableOpacity, TouchableHighlight, ScrollView, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SideMenu }  from 'react-native-side-menu';
import ModalDropdown from 'react-native-modal-dropdown';


export default class ChangeAccount extends Component {
  static get defaultProps() {
    return {
      title: 'Change Account'
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
        <Text style={styles.title}>
          Change Account
        </Text>
        <Text style={styles.account}>
          You're currently logged in as...
        </Text>
            <ModalDropdown style={styles.dropdown}
              options={FIRST_DROPDOWN}
              textStyle={styles.dropdownText}
              dropdownStyle={styles.dropdownDropdown}
              defaultValue='Switch to Which Account?'
              renderRow={this.state.dropdown1RenderRow}            
            />
            <ModalDropdown style={styles.dropdown}
              options={SECOND_DROPDOWN}
              textStyle={styles.dropdownText}
              dropdownStyle={styles.dropdownDropdown}
              defaultValue='Account Settings'
              renderRow={this.state.dropdown2RenderRow}              
            /> 
              <TouchableHighlight onPress={onButtonPress1}>
                <View style={styles.dropdown}>
                  <Text style={styles.dropdownText}>
                    Delete My Account
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
             {rowData}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

}


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
const SECOND_DROPDOWN = ['I', 'Am', 'Unsure', 'What', 'Should', 'Be', 'Here'];
// i Don't know what should be in this dropdown (for account settings)



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
