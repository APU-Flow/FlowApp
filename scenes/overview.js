// overview.js
// Flow

import React, { Component } from 'react';
import { Alert, AsyncStorage, StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import Chart from 'react-native-chart';

export default class Overview extends Component {
  
  static get defaultProps() {
    return {
      message: 'Default message'
    };
  }

  constructor(props) {
    super(props);
    // Initialize state variables
    this.state = {
      data: ''
    }
  }

  componentDidMount() {
    AsyncStorage.multiGet(['email', 'token'], (errors, results) => {
      if (errors) {
        console.error(errors);
      }
      let email = results[0][1];
      let token = results[1][1];
      // let now = new Date();
      // let hourAgo = new Date();
      // hourAgo.setHours(hourAgo.getHours()-1);
      fetch(`http://138.68.56.236:3000/api/getUsageEvent?email=${encodeURI(email)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': token
        }
      })
      .then((response) => response.text())
      .then((responseText) => {
        this.setState({ data: responseText });
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>{this.props.message}</Text>
          <Text style={styles.text}>{this.state.data}</Text>
        </View>
      <Chart
        color={['white']}
        axisColor={['white']}
        axisLabelColor={['white']}
        axisLineWidth={1}

        xAxisHeight={40}
        yAxisWidth={31}

        cornerRadius={4}                    

        data={dataOverview}

        hideHorizontalGridLines={true}
        hideVerticalGridLines={true}
                    
        widthPercent={1}
        verticalGridStep={5}
        horizontalGridStep={2}
                   
        type="bar"
                    
                    
        showDataPoint={false}
        showAxis={true}
    
        style={styles.chart}
        labelFontSize={22} 
        />
      </View>
    );
  }

}

dataOverview = [
    ["S", 1],
    ["M", 3],
    ["T", 9],
    ["W", 4],
    ["Th", 8],
    ["F", 3],
    ["S", 7],
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor:'rgb(52,152,219)',
  },
  text: {
    margin: 10,
    fontSize: 15
  },
  chart: {
      width: 280,
      height: 100,
      margin: 1,
      marginTop: 25,
      marginBottom: 100,
    },
});
