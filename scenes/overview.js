// overview.js
// Flow

import React, { Component } from 'react';

import { Alert, AsyncStorage, StyleSheet, View, Text } from 'react-native';
import Chart from 'react-native-chart';

export default class Overview extends Component {

  static get propTypes() {
    return {
      message: React.PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      message: 'Default message'
    };
  }

  constructor(props) {
    super(props);
    // Initialize state variables
    this.state = {
      data: [['', 0]]
    };
  }

  componentDidMount() {
    AsyncStorage.multiGet(['email', 'token'], (errors, results) => {
      if (errors) {
        Alert.alert('Error', errors);
      }
      let email = results[0][1];
      let token = results[1][1];
      // let now = new Date();
      // let hourAgo = new Date();
      // hourAgo.setHours(hourAgo.getHours()-1);//token, email, date, meterID=1,
      fetch(`http://138.68.56.236:3000/api/getDailyUsage?email=${encodeURI(email)}&date=${encodeURI(new Date())}&meterID=1&token=${encodeURI(token)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': token
        }
      })
      .then((response) => response.json())
      .then((responseObject) => {
        let dataArray = responseObject.data;
        if (Array.isArray(dataArray)) {
          let data = [
            ['8a', dataArray[0]],
            ['9a', dataArray[1]],
            ['10a', dataArray[2]],
            ['11a', dataArray[3]],
            ['12p', dataArray[4]],
            ['1p', dataArray[5]],
            ['2p', dataArray[6]],
            ['3p', dataArray[7]],
            ['4p', dataArray[8]],
            ['5p', dataArray[9]],
            ['6p', dataArray[10]],
            ['7p', dataArray[11]]
          ];
          this.setState({ data });
        } else {
          this.setState({ data: [['', 0]] });
        }
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Overview</Text>
        <Chart
        color={'white'}
        axisColor={'white'}
        axisLabelColor={'white'}
        axisLineWidth={1}

        xAxisHeight={20}
        yAxisWidth={60}

        cornerRadius={4}

        data={this.state.data}

        hideHorizontalGridLines={true}
        hideVerticalGridLines={true}

        widthPercent={1}
        verticalGridStep={5}
        horizontalGridStep={2}

        type='bar'
        lineWidth={4}

        showDataPoint={false}
        showAxis={true}

        style={styles.chart}
        labelFontSize={11}
        />
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor:'rgb(52,152,219)',
  },
  chart: {
    width: 300,
    height: 100,
    margin: 1,
    marginTop: 25,
    marginBottom: 120,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    marginTop: 45,
    fontSize: 40,
    fontWeight: '400',
    marginBottom: 2
  },
});
