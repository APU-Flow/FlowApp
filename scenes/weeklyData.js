
import React, { Component } from 'react';
import { StyleSheet, Text, Alert, View, TouchableHighlight} from 'react-native';
import Chart from 'react-native-chart';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



export default class WeeklyData extends Component {
  static get defaultProps() {
    return {
      title: 'WeeklyData'
    };
  }
    render() {
        return (
          <View style={styles.container}>
             
                <View>
                    <Chart
                      style={styles.chart}
                      data={data}
                      verticalGridStep={5}
                      type="bar"
                      showDataPoint={true}
                    />
                </View>
                <View>
                  <Chart
                    style={styles.chart}
                    data={data}
                    verticalGridStep={5}
                    type="pie"
                    showDataPoint={true}
                 />
                </View>
          </View>
        );
    }
}

const data = [
    [0, 1],
    [1, 3],
    [3, 7],
    [4, 9],
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
        //flexDirection: 'row',
        flex: 1,
        width: 300,
        height: 150,
    },
});
