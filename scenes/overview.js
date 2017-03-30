// overview.js
// Flow

import React, { Component } from 'react';

import { Alert, AsyncStorage, StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import Chart from 'react-native-chart';

dataMlUsageHr=[0,0,0,0,0,0,0,0,0,0,0,0];
//change this so it gets input from database
dataOverview = [
    ["8a", dataMlUsageHr[0]],
    ["9a", dataMlUsageHr[1]],
    ["10a", dataMlUsageHr[2]],
    ["11a", dataMlUsageHr[3]],
    ["12p", dataMlUsageHr[4]],
    ["1p", dataMlUsageHr[5]],
    ["2p", dataMlUsageHr[6]],
    ["3p", dataMlUsageHr[7]],
    ["4p", dataMlUsageHr[8]],
    ["5p", dataMlUsageHr[9]],
    ["6p", dataMlUsageHr[10]],
    ["7p", dataMlUsageHr[11]],
];

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
      data: '',
      dataFinalArray: dataOverview,
      dataArray: [0,0,800,1,1,0,0,0,0,0,300,7]
    };
    this.color = 'white';
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
        this.setState({ data: responseObject.data });
      });
    });
    {var dataReplace= this.state.dataArray.slice()}
    {var dataDayReplace=[
      ["8a", dataReplace[0]],
      ["9a", dataReplace[1]],
      ["10a", dataReplace[2]],
      ["11a", dataReplace[3]],
      ["12p", dataReplace[4]],
      ["1p", dataReplace[5]],
      ["2p", dataReplace[6]],
      ["3p", dataReplace[7]],
      ["4p", dataReplace[8]],
      ["5p", dataReplace[9]],
      ["6p", dataReplace[10]],
      ["7p", dataReplace[11]],
      ];}
    this.setState({dataFinalArray: dataDayReplace})
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>{this.props.message}</Text>
          <Text style={styles.text}>{this.state.data}</Text>
          <Text style={styles.title}>Overview</Text>
        </View>
         <Chart
          color={"white"}
          axisColor={"white"}
          axisLabelColor={"white"}
          axisLineWidth={1}

          xAxisHeight={20}
          yAxisWidth={60}

          cornerRadius={4}

          data={this.state.dataFinalArray}

          hideHorizontalGridLines={true}
          hideVerticalGridLines={true}

          widthPercent={1}
          verticalGridStep={5}
          horizontalGridStep={2}

          type="line"
          lineWidth={4}

          showDataPoint={false}
          showAxis={true}
                    
          style={styles.chart}
          labelFontSize={11}                  
          />
      </View>
    );
  }
  // showDataFromDatabase()
  // {

  // }
}


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
        width: 300,
        height: 100,
        margin: 1,
        marginTop: 25,
        marginBottom: 120,
    },
  title: 
    {
    textAlign: 'center',
    color: 'white',
    marginTop: 45,
    fontSize: 40,
    fontWeight: '400',
    marginBottom: 2
    },
});
