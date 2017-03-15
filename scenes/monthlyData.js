
import React, { Component } from 'react';
import { StyleSheet, Text, Alert, ScrollView, View, TouchableHighlight} from 'react-native';
import Chart from 'react-native-chart';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



export default class MonthlyData extends Component {
  static get defaultProps() {
    return {
      title: 'MonthlyData'
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
                  <Text style={styles.title}>Monthly</Text>
                 </View>
                  <Chart
                    style={styles.chart}
                    XAxisLabel={"Fluid Ounces"}
                    YAxisLabel={"Day of Week"}
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
    ["Jan", 1],
    ["Feb", 3],
    ["Mar", 9],
    ["Apr", 4],
    ["May", 10],
    ["June", 3],
    ["July", 7],
    ["Aug", 9],
    ["Sept", 4],
    ["Oct", 10],
    ["Nov", 3],
    ["Dec", 7],
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
        width: 300,
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
});
