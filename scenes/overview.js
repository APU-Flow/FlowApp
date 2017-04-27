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
      weeklyData: [['', 0]],
      submitReport: '',
      graphColor: 'white',
    };
  }

  componentDidMount() {
    return new Promise((resolve, reject) => {
      let now = new Date();
      fetch(`http://138.68.56.236:3000/api/getWeeklyUsage?&date=${encodeURI(now.valueOf())}&meterID=${this.props.meterId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': this.state.token
        }
      })
      .then((response) => {
        switch (response.status) {
          case 204:
            return {data: null};
          default:
            return response.json();
        }
      })
      .then((responseObject) => {
        let {data} = responseObject;

        if (Array.isArray(data)) {
          if (data.length !== 7) {
            reject('Invalid data array returned from server!');
            return;
          }

          let weekGraphData = [];
          let weekdayStrings = ['S','M','T','W','Th','F','Sa'];

          // We know data.length === 7, as verified above, so we can just use 7
          for (let i = 0; i < 7; i++) {
            let weekday = now.getDay() - (6 - i);

            weekGraphData[i] = [
              weekdayStrings[(weekday < 0) ? weekday+7 : weekday],
              data[i]
            ];
          }

          this.setState({weeklyData: weekGraphData}, () => resolve(weekGraphData));
        } else {
          this.setState({weeklyData: [['', 0]], graphColor: 'rgb(52,152,219)'}, () => resolve(false));
        }
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Overview</Text>
        <View>
          <Text style={styles.label}>Ml</Text>
        </View>
        <Chart
        color={this.state.graphColor}
        axisColor={'white'}
        axisLabelColor={'white'}
        axisLineWidth={1}

        xAxisHeight={20}
        yAxisWidth={60}

        cornerRadius={4}

        data={this.state.weeklyData}

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
        <Text>{this.state.submitReport}</Text>
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
  label: {
    position: 'absolute',
    right: 140,
    top: 220,
    color: 'white',
    fontSize: 12,
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
