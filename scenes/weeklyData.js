
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
                  <Text style={styles.title}>Weekly</Text>
                 </View>
                  <Chart
                    color={['white']}
                    axisColor={['white']}
                    axisLabelColor={['white']}
                    axisLineWidth={1}

                    xAxisHeight={40}
                    yAxisWidth={31}

                    cornerRadius={4}                    

                    data={data}

                    hideHorizontalGridLines={true}
                    hideVerticalGridLines={true}
                    
                    widthPercent={1}
                    verticalGridStep={5}
                    horizontalGridStep={2}
                   
                    type="bar"
                    
                    
                    showDataPoint={false}
                    showAxis={true}
    
                    style={styles.chart}
                    labelFontSize={22} 
                 />
          </View>
        );
    }
}

//change this so it is not a constant, gets input from database
const data = [
    ["S", 1],
    ["M", 3],
    ["T", 9],
    ["W", 4],
    ["Th", 8],
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
