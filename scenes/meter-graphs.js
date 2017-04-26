// meter-graphs.js
// Flow

import React, { Component } from 'react';
import { StyleSheet, Alert, Text, AsyncStorage, View, TouchableHighlight} from 'react-native';
import Chart from 'react-native-chart';
import ModalDropdown from 'react-native-modal-dropdown';

export default class MeterGraphs extends Component {

  static get propTypes() {
    return {
      meterId: React.PropTypes.number.isRequired
    };
  }

  constructor(props) {
    super(props);

    // Initialize state letiables
    this.state = {
      graphList: ['line', 'bar'],
      graphType: 'bar',
      graphTimeList: ['daily','weekly','monthly'],
      dataDay: [['', 0]],
      dataWeek: [['', 0]],
      dataMonth: [['', 0]],
      mainDataArray: [['', 0]],
    };

    this.requestDailyEvents = this.requestDailyEvents.bind(this);
    this.requestWeeklyEvents = this.requestWeeklyEvents.bind(this);
    this.requestMonthlyEvents = this.requestMonthlyEvents.bind(this);
    this.dropdownRenderRow = this.dropdownRenderRow.bind(this);
    this.viewGraph = this.viewGraph.bind(this);
    this.viewTimeGraph = this.viewTimeGraph.bind(this);
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
        this.requestWeeklyEvents();
        this.requestMonthlyEvents();
      });
    });
  }

  requestDailyEvents() {
    return new Promise((resolve, reject) => {
      let now = new Date();
      fetch(`http://138.68.56.236:3000/api/getDailyUsage?date=${encodeURI(now.valueOf())}&meterID=${this.props.meterId}`, {
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
          this.setState({dailyData: [['', 0]], graphType: 'line'}, () => resolve(false));
        }
      });
    });
  }

  requestWeeklyEvents() {
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
          this.setState({weeklyData: [['', 0]], graphType: 'line'}, () => resolve(false));
        }
      });
    });
  }

  requestMonthlyEvents() {
    return new Promise((resolve, reject) => {
      let now = new Date();
      fetch(`http://138.68.56.236:3000/api/getMonthlyUsage?&year=${encodeURI(now.getFullYear())}&meterID=${this.props.meterId}`, {
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

          let monthGraphData = [];
          let monthStrings = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

          // We know data.length === 12, as verified above, so we can just use 12
          for (let i = 0; i < 12; i++) {
            monthGraphData[i] = [
              monthStrings[i],
              data[i]
            ];
          }


          this.setState({monthlyData: monthGraphData}, () => resolve(monthGraphData));
        } else {
          this.setState({monthlyData: [['', 0]], graphType: 'line'}, () => resolve(false));
        }
      });
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Device Overview</Text>
        </View>
        <View>
          <Text style={styles.label}>Ml</Text>
        </View>
        <ModalDropdown style={styles.dropdown}
          options={this.state.graphList}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownDropdown1}
          defaultValue='Change Graph Type'
          renderRow={this.dropdownRenderRow}
          onSelect={this.viewGraph}
        />
        <ModalDropdown style={styles.dropdown}
          options={this.state.graphTimeList}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownDropdown2}
          defaultValue='Change Graph Time'
          renderRow={this.dropdownRenderRow}
          onSelect={this.viewTimeGraph}
        />
        <Chart
          color={'white'}
          axisColor={'white'}
          axisLabelColor={'white'}
          axisLineWidth={1}

          xAxisHeight={40}
          yAxisWidth={50}
          yAxisShortLabel={true}

          cornerRadius={4}

          data={this.state.mainDataArray}

          hideHorizontalGridLines={true}
          hideVerticalGridLines={true}

          widthPercent={1}
          verticalGridStep={5}
          horizontalGridStep={2}

          type={this.state.graphType}
          lineWidth={4}

          showDataPoint={false}
          showAxis={true}

          style={styles.chart}
          labelFontSize={10}
        />
      </View>
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
  viewGraph(index, value) {
    this.setState({
      graphType: value,
      graphshowAxes: true
    });

  }

  viewTimeGraph(index, value) {
    switch (value) {
      case 'daily':
        this.setState((prevState) => {
          return {mainDataArray: prevState.dailyData};
        });
        break;
      case 'weekly':
        this.setState((prevState) => {
          return {mainDataArray: prevState.weeklyData};
        });
        break;
      case 'monthly':
        this.setState((prevState) => {
          return {mainDataArray: prevState.monthlyData};
        });
        break;
    }
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
    height: 70,
    marginTop: 5,
    marginBottom: 190,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    marginTop: 150,
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 2
  },
  label: {
    position: 'absolute',
    right: 135,
    top: 230,
    color: 'white',
    fontSize: 12,
  },
  dropdown: {
    margin: 2,
    borderColor:  'gray',
    borderWidth: 1,
    borderRadius: 1,
    backgroundColor: 'rgb(31,58,147)',
    width:170,
    height:40,
  },
  dropdownText: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdownDropdown1: {
    margin: 8,
    width: 152,
    height: 80,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: 'rgb(31,58,147)',
  },
  dropdownDropdown2: {
    margin: 8,
    width: 152,
    height: 125,
    borderColor: 'gray',
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
    fontSize: 12,
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
  }
});
