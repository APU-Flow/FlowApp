
import React, { Component } from 'react';
import { StyleSheet, Text, Alert, ScrollView, View, TouchableHighlight} from 'react-native';
import Chart from 'react-native-chart';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalDropdown from 'react-native-modal-dropdown';


export default class DailyData extends Component {
  static get defaultProps() {
    return {
      title: 'DailyData'
    };
  }

  constructor(props) {
    super(props);
   
    // Initialize state variables
    this.state = {
      graphList: ['line', 'bar', 'pie'],
    //graph state to switch rendering
      graphType: "line",
      graphshowAxes: true,
      graphTimeList: ['daily','weekly','monthly'],
      dataArray: dataWeek,
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
                  <Text style={styles.title}>Today</Text>
                 </View>
                 <ModalDropdown style={styles.dropdown}
                  options={this.state.graphList}
                  textStyle={styles.dropdownText}
                  dropdownStyle={styles.dropdownDropdown}
                  defaultValue='Change Graph Type'
                  renderRow={this.dropdownRenderRow}  
                  onSelect={this.viewGraph}        
                />
                <ModalDropdown style={styles.dropdown}
                  options={this.state.graphTimeList}
                  textStyle={styles.dropdownText}
                  dropdownStyle={styles.dropdownDropdown}
                  defaultValue='Change Graph Time'
                  renderRow={this.dropdownRenderRow}  
                  onSelect={this.viewTimeGraph}        
                />
                  <Chart
                    color={"white"}
                    axisColor={"white"}
                    axisLabelColor={"white"}
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
                    labelFontSize={8}

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
      this.setState({graphType: "bar"})
      this.setState({graphshowAxes: true})
    }
    if (value=='line')
    {
      this.setState({graphType: "line"})
      this.setState({graphshowAxes: true})
    }
    if (value=='pie')
    {
      this.setState({graphType: "pie"})
      this.setState({graphshowAxes: false})
    }
   
  }

  viewTimeGraph(index, value) {
    if (value=='weekly')
    {
      
      this.setState({dataArray: dataWeek})
    }
    if (value=='daily')
    {
       this.setState({dataArray: dataDay })
    }
    if (value=='monthly')
    {
       this.setState({dataArray: dataMonth})
    }
   
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
//
 */
colorSlices=["red","green","blue", "black", "yellow", "orange","gray", "silver", ];
 var dataMlUsageHr= [1,3,9,4,8,3,7,9,4,8,3,7,4];
    var dataDay = [
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

  //weekly
      var dataMlUsageDay= [1,3,9,4,8,3,7];
  //change this so it gets input from database
      var dataWeek = [
      ["S", dataMlUsageDay[0]],
      ["M", dataMlUsageDay[1]],
      ["T", dataMlUsageDay[2]],
      ["W", dataMlUsageDay[3]],
      ["Th", dataMlUsageDay[4]],
      ["F", dataMlUsageDay[5]],
      ["S", dataMlUsageDay[6]],
      ];
  //monthly
    var dataMlUsageMonth=[1,3,9,4,8,3,7,9,4,8,3,7];
  //change this so it gets input from database
    var dataMonth = [
      ["Jan", dataMlUsageMonth[0]],
      ["Feb", dataMlUsageMonth[1]],
      ["Mar", dataMlUsageMonth[2]],
      ["Apr", dataMlUsageMonth[3]],
      ["May", dataMlUsageMonth[4]],
      ["June", dataMlUsageMonth[5]],
      ["July", dataMlUsageMonth[6]],
      ["Aug", dataMlUsageMonth[7]],
      ["Sept", dataMlUsageMonth[8]],
      ["Oct", dataMlUsageMonth[9]],
      ["Nov", dataMlUsageMonth[10]],
      ["Dec", dataMlUsageMonth[11]],
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
        width: 345,
        height: 70,
        margin: 1,
        marginTop: 5,
        marginBottom: 190,
    },
    title: 
    {
        textAlign: 'center',
        color: 'white',
        marginTop: 185,
        fontSize: 40,
        fontWeight: '400',
        marginBottom: 2
    },
   dropdown: {
      margin: 2,
      borderColor:  'rgb(31,58,147)',
      backgroundColor: 'rgb(31,58,147)',
      borderWidth: 1,
      borderRadius: 1,
      width:170,
      height:45,
    },
    dropdownText: {
      marginVertical: 10,
      marginHorizontal: 6,
      fontSize: 18,
      color: 'white',
      textAlign: 'center',
      textAlignVertical: 'center',
    },
     dropdownDropdown: {
      margin: 8,
      width: 152,
      height: 100,
      borderColor: 'rgb(31,58,147)',
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
      fontSize: 16,
      color: 'white',
      textAlignVertical: 'center',
      textAlign: 'center',
    }
});
