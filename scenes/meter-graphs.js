
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import Chart from 'react-native-chart';
import ModalDropdown from 'react-native-modal-dropdown';


let dataMlUsageHrAmPm= [1,3,9,4,8,3,7,9,4,8,3,7];
let dataDayAmPm = [
  ['8a', dataMlUsageHrAmPm[0]],
  ['9a', dataMlUsageHrAmPm[1]],
  ['10a', dataMlUsageHrAmPm[2]],
  ['11a', dataMlUsageHrAmPm[3]],
  ['12p', dataMlUsageHrAmPm[4]],
  ['1p', dataMlUsageHrAmPm[5]],
  ['2p', dataMlUsageHrAmPm[6]],
  ['3p', dataMlUsageHrAmPm[7]],
  ['4p', dataMlUsageHrAmPm[8]],
  ['5p', dataMlUsageHrAmPm[9]],
  ['6p', dataMlUsageHrAmPm[10]],
  ['7p', dataMlUsageHrAmPm[11]],
];
//pm to am
let dataMlUsageHrPmAm= [1,3,9,4,8,3,7,18,4,8,3,7];
let dataDayPmAm = [
  ['8a', dataMlUsageHrPmAm[0]],
  ['9a', dataMlUsageHrPmAm[1]],
  ['10a', dataMlUsageHrPmAm[2]],
  ['11a', dataMlUsageHrPmAm[3]],
  ['12p', dataMlUsageHrPmAm[4]],
  ['1p', dataMlUsageHrPmAm[5]],
  ['2p', dataMlUsageHrPmAm[6]],
  ['3p', dataMlUsageHrPmAm[7]],
  ['4p', dataMlUsageHrPmAm[8]],
  ['5p', dataMlUsageHrPmAm[9]],
  ['6p', dataMlUsageHrPmAm[10]],
  ['7p', dataMlUsageHrPmAm[11]],
];

//weekly
let dataMlUsageDay= [1,3,9,4,8,3,7];

let dataWeek = [
  ['S', dataMlUsageDay[0]],
  ['M', dataMlUsageDay[1]],
  ['T', dataMlUsageDay[2]],
  ['W', dataMlUsageDay[3]],
  ['Th', dataMlUsageDay[4]],
  ['F', dataMlUsageDay[5]],
  ['S', dataMlUsageDay[6]],
];
//monthly
let dataMlUsageMonth=[1,3,9,4,8,3,7,9,4,8,3,7];

let dataMonth = [
  ['Jan', dataMlUsageMonth[0]],
  ['Feb', dataMlUsageMonth[1]],
  ['Mar', dataMlUsageMonth[2]],
  ['Apr', dataMlUsageMonth[3]],
  ['May', dataMlUsageMonth[4]],
  ['Jun', dataMlUsageMonth[5]],
  ['Jul', dataMlUsageMonth[6]],
  ['Aug', dataMlUsageMonth[7]],
  ['Sep', dataMlUsageMonth[8]],
  ['Oct', dataMlUsageMonth[9]],
  ['Nov', dataMlUsageMonth[10]],
  ['Dec', dataMlUsageMonth[11]],
];

export default class MeterGraphs extends Component {
  static get defaultProps() {
    return {
      title: 'MeterGraphs'
    };
  }

  constructor(props) {
    super(props);

    // Initialize state letiables
    this.state = {
      graphList: ['line', 'bar'],
    //graph state to switch rendering
      graphType: 'bar',
      graphshowAxes: true,
      graphTimeList: ['daily(8am>7pm)','daily(8pm>7am)','weekly','monthly'],
      dataArray: dataDayAmPm,
    };

    this.dropdownRenderRow = this.dropdownRenderRow.bind(this);
    this.viewGraph = this.viewGraph.bind(this);
    this.viewTimeGraph = this.viewTimeGraph.bind(this);
    this.color = 'white';
  }





  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Device Overview</Text>
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
          yAxisWidth={19}

          cornerRadius={4}

          data={this.state.dataArray}

          hideHorizontalGridLines={true}
          hideVerticalGridLines={true}

          widthPercent={1}
          verticalGridStep={5}
          horizontalGridStep={2}

          type={this.state.graphType}
          lineWidth={4}

          showDataPoint={false}
          showAxis={this.state.graphshowAxes}

          style={styles.chart}
          labelFontSize={14}

          sliceColors={colorSlices}
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
    if (value=='bar')
    {
      this.setState({graphType: 'bar'});
      this.setState({graphshowAxes: true});
    }
    if (value=='line')
    {
      this.setState({graphType: 'line'});
      this.setState({graphshowAxes: true});
    }
  }

  viewTimeGraph(index, value) {
    if (value=='weekly') {
      this.setState({dataArray: dataWeek});
    }
    if (value=='daily(8am>7pm)') {
      this.setState({dataArray: dataDayAmPm });
    }
    if (value=='daily(8pm>7am)') {
      this.setState({dataArray: dataDayPmAm });
    }
    if (value=='monthly') {
      this.setState({dataArray: dataMonth});
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
    width: 345,
    height: 70,
    margin: 1,
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
    height: 165,
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
