import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, ScrollView, AsyncStorage, Alert, RefreshControl } from 'react-native';
import Chart from 'react-native-chart';
// import ListViewSelect from 'react-native-list-view-select';
 
var Overview = require('../scenes/overview');

class Test extends Component {

  state = {
    isRefreshing: false,
    loaded: 0,
    data: [['', 0]],
    submitReport: ''
  };

  // _onClick = (row) => {
  //   row.clicks++;
  //   this.setState({
  //     rowData: this.state.rowData,
  //   });
  // };

  render() {
    // const rows = this.state.rowData.map((row, ii) => {
    //   return <Row key={ii} data={row} onClick={this._onClick}/>;
    // });
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }>
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

        type='line'
        lineWidth={4}

        showDataPoint={false}
        showAxis={true}

        style={styles.chart}
        labelFontSize={11}
        />
        <Text>{this.state.submitReport}</Text>
      </ScrollView>
    );
  }

  componentDidMount() {
    AsyncStorage.getItem('token', (errors, token) => {
      if (errors) {
        Alert.alert('Error', errors);
      }

      fetch(`http://138.68.56.236:3000/api/getDailyUsage?&date=${encodeURI(Date.now())}&meterID=1`, {
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
              let dataArray = responseObject.data;
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
            });
            break;
          default:
            response.json().then((responseObject) => {
              this.setState({
                submitReport: `${response.status}: ${responseObject.message}`,
                data: [['', 0]]
              });
            });
        }
      });
    });
  }

  _onRefresh = () => {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({
        isRefreshing: false,
      });
    }, 5000);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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

module.exports = Test;