import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import ListViewSelect from 'react-native-list-view-select';
import _ from 'lodash';
 
export default class Test extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      item: "Select Item",
      isVisible: false,
    };
    _.bindAll(this, ['showPopover', 'closePopover', 'setItem']);
  }
 
  showPopover() {
    this.setState({isVisible: true});
  }
 
  closePopover() {
    this.setState({isVisible: false});
  }
 
  setItem(item) {
    this.setState({ item: item });
  }
 
  render() {
    const { selectedCity } = this.props;
    const items = [
      "Item 1",
      "Item 2",
      "Item 3",
      "Item 4",
    ];
 
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.showPopover}>
          <Text>{this.state.item}</Text>
        </TouchableHighlight>
        <ListViewSelect
          list={items}
          isVisible={this.state.isVisible}
          onClick={this.setItem}
          onClose={this.closePopover}
        />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
    // paddingTop: 50,
    paddingTop: 100,
    paddingBottom: 100,
    // backgroundColor:'rgb(52,152,219)',
  },
});

module.exports = Test;