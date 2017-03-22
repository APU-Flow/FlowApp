
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
                    color={['white']}
                    axisColor={['white']}
                    axisLabelColor={['white']}
                    axisLineWidth={1}

                    xAxisHeight={40}
                    yAxisWidth={19}

                    cornerRadius={4}

                    data={dataMonth}

                    hideHorizontalGridLines={true}
                    hideVerticalGridLines={true}

                    widthPercent={1}
                    verticalGridStep={5}
                    horizontalGridStep={2}

                    type="bar"
                    
                    showDataPoint={false}
                    showAxis={true}
                    
                    style={styles.chart}
                    labelFontSize={9}                  
                 />
          </View>
        );
    }
}

//change this so it is not a constant, gets input from database
dataMonth = [
    ["Jan", 1],
    ["Feb", 3],
    ["Mar", 9],
    ["Apr", 4],
    ["May", 8],
    ["June", 3],
    ["July", 7],
    ["Aug", 9],
    ["Sept", 4],
    ["Oct", 8],
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
