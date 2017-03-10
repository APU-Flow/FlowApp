
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
                  <Text style={styles.text}>Weekly</Text>
                 </View>
                  <Chart
                    style={styles.chart}
                    XAxisLabel={"Fluid Ounces"}
                    data={data}
                    verticalGridStep={5}
                    xAxisHeight={1}
                    yAxisWidth={11}
                    type="bar"
                    tightBounds={false}
                    showDataPoint={false}
                    showAxis={true}
                    showXAxisLabels={true}
                    hideHorizontalGridLines={true}
                    hideVerticalGridLines={true}
                 />
          </View>
        );
    }
}

//graph appears to be wrong at smaller values (shows max of 7 when it is 9)
const data = [
    ["S", 1],
    ["M", 3],
    ["T", 9],
    ["W", 22],
    ["Th", 60],
    ["F", 3],
    ["S", 7],
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    chart: {
        marginTop: 60,
        width: 240,
        height: 100,
    },
    title: {
      textAlign: 'center',
      color: 'white',
      marginTop: 25,
      fontSize: 20,
      fontWeight: '400',
      marginBottom: 15
  },
});
