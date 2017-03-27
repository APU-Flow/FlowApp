// overview.js
// Flow

import React, { Component } from 'react';

import { Alert, AsyncStorage, StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import Chart from 'react-native-chart';


export default class Overview extends Component {

  static get propTypes() {
    return {
      message: React.PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      message: 'Default message'
    };
  }

  constructor(props) {
    super(props);
    // Initialize state variables
    this.state = {
      data: ''
    };
  }

  componentDidMount() {
    AsyncStorage.multiGet(['email', 'token'], (errors, results) => {
      if (errors) {
        Alert.alert('Error', errors);
      }
      let email = results[0][1];
      let token = results[1][1];
      // let now = new Date();
      // let hourAgo = new Date();
      // hourAgo.setHours(hourAgo.getHours()-1);
      fetch(`http://138.68.56.236:3000/api/getUsageEvent?email=${encodeURI(email)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': token
        }
      })
      .then((response) => response.text())
      .then((responseText) => {
        this.setState({ data: responseText });
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>{this.props.message}</Text>
          <Text style={styles.text}>{this.state.data}</Text>
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

          data={dataOverview}

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


/*Pseudo-code for getting input from database:
Stringify JSON object 
ex. (timeStarted,timeEnded,totalWaterUsed) 
eg. (8.23am=>8.45am,10)
//categorize into which hour the event was..ie if user
//had shower from 8:59am until 9:30 then it will be graphed as a 9am event.
//same hour
if (charAt(1)==8 && charAt(5)==a && charAt(9)==8 && charAt(13)==a)
{
  arrayOfTimesAndUsage[[0,0]]=8
  //if 2 digit number (check closed parenthesis position)
  //then
    arrayOfTimesAndUsage[[0,1]]=parseInt(charAt(16)&&charAt(17))
  //else
    arrayOfTimesAndUsage[[0,1]]=parseInt(charAt(16)
}
//^^copy and paste this for different hours and times (am/pm, 1-12)
//could make life a lot easier if we just went off time ended or time started
//or middle between them.
//goes into next hour, choose where more water was used as hour
//goes into multiple hours,
//usageEvents when it goes on for more than a day?
//add up multiple events within same hour, make one piece of data
//dataMlUsageHr==
//
 */


dataMlUsageHr=[1,3,9,4,8,3,7,9,4,8,3,7,4];
//change this so it gets input from database
dataOverview = [
    ["8am", dataMlUsageHr[0]],
    ["9am", dataMlUsageHr[1]],
    ["10am", dataMlUsageHr[2]],
    ["11am", dataMlUsageHr[3]],
    ["12pm", dataMlUsageHr[4]],
    ["1pm", dataMlUsageHr[5]],
    ["2pm", dataMlUsageHr[6]],
    ["3pm", dataMlUsageHr[7]],
    ["4pm", dataMlUsageHr[8]],
    ["5pm", dataMlUsageHr[9]],
    ["6pm", dataMlUsageHr[10]],
    ["7pm", dataMlUsageHr[11]],
    ["8pm", dataMlUsageHr[12]],
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor:'rgb(52,152,219)',
  },
  text: {
    margin: 10,
    fontSize: 15
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
