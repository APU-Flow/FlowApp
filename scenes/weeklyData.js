
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

                    data={dataWeek}

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

/*Pseudo-code for getting input from database:
Stringify JSON object
//do we even need to get from database or can we use what we have from daily?
//something like
for(all of day's data)
{
    add ml Used into totalMlUsed
}
put totalMlUsed into ordered pair with date, send into database
//this could be done whenever we get daily from database or if George already had it
//then that would be good too.

//then get from database: similar to daily code.

 */
dataMlUsageDay=[1,3,9,4,8,3,7];
//change this so it gets input from database
dataWeek = [
    ["S", dataMlUsageDay[0]],
    ["M", dataMlUsageDay[1]],
    ["T", dataMlUsageDay[2]],
    ["W", dataMlUsageDay[3]],
    ["Th", dataMlUsageDay[4]],
    ["F", dataMlUsageDay[5]],
    ["S", dataMlUsageDay[6]],
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
