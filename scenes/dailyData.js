
import React, { Component } from 'react';
import { StyleSheet, Text, Alert, ScrollView, View, TouchableHighlight} from 'react-native';
import Chart from 'react-native-chart';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



export default class DailyData extends Component {
  static get defaultProps() {
    return {
      title: 'DailyData'
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
                  <Text style={styles.title}>Today</Text>
                 </View>
                  <Chart
                    color={['white']}
                    axisColor={['white']}
                    axisLabelColor={['white']}
                    axisLineWidth={1}

                    xAxisHeight={40}
                    yAxisWidth={19}

                    cornerRadius={4}

                    data={dataDay}

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
                    labelFontSize={8}                  
                 />
          </View>
        );
    }
}

//change this so it is not a constant, gets input from database
dataDay = [
    ["8am", 1],
    ["9am", 3],
    ["10am", 9],
    ["11am", 4],
    ["12pm", 8],
    ["1pm", 3],
    ["2pm", 7],
    ["3pm", 9],
    ["4pm", 4],
    ["5pm", 8],
    ["6pm", 3],
    ["7pm", 7],
    ["8pm", 4],
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
        margin: 1,
        marginTop: 25,
        marginBottom: 100,
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
