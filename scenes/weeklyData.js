
import React, { Component } from 'react';
import { StyleSheet, Text, Alert, ScrollView, View, TouchableHighlight} from 'react-native';
import Chart from 'react-native-chart';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



export default class WeeklyData extends Component {
  static get defaultProps() {
    return {
      title: 'WeeklyData'
    };
  }

  // constructor(props) {
  //   super(props);

  //   // Initialize state variables
  // }


    render() {
        return (
          <View style={styles.container}>
                  <View>
                  <Text style={styles.label}>Ml</Text>
                  </View>
                 <View>
                  <Text style={styles.title}>Weekly</Text>
                 </View>
                  <Chart
                    style={styles.chart}
                    XAxisLabel={"Fluid Ounces"}
                    YAxisLabel={"Month"}
                    data={data}
                    verticalGridStep={5}
                    xAxisHeight={1}
                    yAxisWidth={25}
                    type="bar"
                    tightBounds={false}
                    showDataPoint={false}
                    showAxis={true}
                    showXAxisLabels={true}
                    showYAxisLabels={true}
                    hideHorizontalGridLines={false}
                    hideVerticalGridLines={true}
                    color={['white']}
                    axisColor={['white']}
                    axisLabelColor={['white']}
                    gridLineWidth={1}
                    axisLineWidth={0}
                    gridColor={'rgb(31,58,147)'}
                    axisLabelColor={'white'}
                 />
          </View>
        );
    }
}

//change this so it is not a constant, gets it from input from database
// const data2 = ["Birds"];
const data = [
    ["S", 1],
    ["M", 3],
    ["T", 9],
    ["W", 4],
    ["Th", 10],
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
    chart: {
        width: 280,
        height: 100,
        margin: 15,
        marginTop: 20,
        marginBottom: 85,
    },
    title: 
    {
    textAlign: 'center',
    color: 'white',
    marginTop: 45,
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 2
    },
    label: 
    {
    color: 'white',
    transform: [{ rotate: '90deg'}]
    },
});
