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
      mainDataArray: [['', 0]],
      graphColor: 'white',
    };
    this.requestDailyEvents = this.requestDailyEvents.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('token', (errors, token) => {
      if (errors) {
        Alert.alert('Error', errors.toString());
      }

      this.setState({token}, () => {
        this.requestDailyEvents().then((graphData) => {
          this.setState({mainDataArray: graphData});
        });
      });
    });
  }

  requestDailyEvents() {
    return new Promise((resolve, reject) => {
      let now = new Date();
      fetch(`http://138.68.56.236:3000/api/getDailyUsage?date=${encodeURI(now.valueOf())}`, {
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
          if (data.length !== 12) {
            reject('Invalid data array returned from server!');
            return;
          }

          let dayGraphData = [];
          let hourStrings = [
            '12a','1a','2a','3a','4a','5a','6a','7a','8a','9a','10a','11a',
            '12p','1p','2p','3p','4p','5p','6p','7p','8p','9p','10p','11p'
          ];

          // We know data.length === 12, as verified above, so we can just use 12
          for (let i = 0; i < 12; i++) {
            let hour = now.getHours() - (11 - i);

            dayGraphData[i] = [
              hourStrings[(hour < 0) ? hour+24 : hour],
              data[i]
            ];
          }

          this.setState({dailyData: dayGraphData}, () => resolve(dayGraphData));
        } else {
          this.setState({dailyData: [['', 0]], graphColor: 'rgb(52,152,219)'}, () => resolve([['', 0]]));
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

        data={this.state.mainDataArray}

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
