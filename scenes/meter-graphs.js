
import React, { Component } from 'react';
import { StyleSheet, Alert, Text, AsyncStorage, View, TouchableHighlight} from 'react-native';
import Chart from 'react-native-chart';
import ModalDropdown from 'react-native-modal-dropdown';

//am to pm
// let dataMlUsageHr= [0];
let dataDay = [['', 0]];

//weekly
//let dataMlUsageDay= [1,3,9,4,8,3,7];
let dataWeek =   [['', 0]];

//monthly
//let dataMlUsageMonth=[1,3,9,4,8,3,7,9,4,8,3,7];
let dataMonth = [['', 0]];

export default class MeterGraphs extends Component {

  constructor(props) {
    super(props);

    // Initialize state letiables
    this.state = {
      graphList: ['line', 'bar'],
      graphType: 'bar',
      graphshowAxes: true,
      graphTimeList: ['daily','weekly','monthly'],
      mainDataArray: dataDay,
    };

    this.dropdownRenderRow = this.dropdownRenderRow.bind(this);
    this.viewGraph = this.viewGraph.bind(this);
    this.viewTimeGraph = this.viewTimeGraph.bind(this);
    this.color = 'white';
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
      // hourAgo.setHours(hourAgo.getHours()-1);//token, email, date, meterID=1,
      fetch(`http://138.68.56.236:3000/api/getDailyUsage?email=${encodeURI(email)}&date=${encodeURI(Date.now())}&meterID=1`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': token
        }
      })
      .then((response) => response.json())
      .then((responseObject) => {
  let dataMlUsageHr = responseObject.data;
  //Alert.alert('response', responseObject.message);
        if (Array.isArray(dataMlUsageHr)) {
          let time = (new Date().getHours());
          let arrayOfHours = ['12a','1a','2a','3a','4a','5a','6a','7a','8a','9a','10a','11a','12p','1p','2p','3p','4p','5p','6p','7p','8p','9p','10p','11p'];
          let arrayVars = ['','','','','','','','','','','',''];
          //for entirety of 0-23, if time=i, match i with arrayOfVars j.
          //another for loop to loop through arrayOfVars
          //whole thing allocates correct times to arrayVars
          for (i=0;i<24;i++)
          {
            if (time==i)
            {
              l=i
              for (j =0;j<arrayVars.length-1;j++)
              {
                if (l==0)
                  l=23;
                arrayVars[j]=arrayOfHours[l];
                l--;
              }
            }
          }
          let dataDay = [
            [arrayVars[11], dataMlUsageHr[0]],
            [arrayVars[10], dataMlUsageHr[1]],
            [arrayVars[9], dataMlUsageHr[2]],
            [arrayVars[8], dataMlUsageHr[3]],
            [arrayVars[7], dataMlUsageHr[4]],
            [arrayVars[6], dataMlUsageHr[5]],
            [arrayVars[5], dataMlUsageHr[6]],
            [arrayVars[4], dataMlUsageHr[7]],
            [arrayVars[3], dataMlUsageHr[8]],
            [arrayVars[2], dataMlUsageHr[9]],
            [arrayVars[1], dataMlUsageHr[10]],
            [arrayVars[0], dataMlUsageHr[11]] //gonna be array[0]
          ];
          //let time = new Date().getHours().toString();
          this.setState({mainDataArray: dataDay });
        } else {
          
          //Alert.alert('time: ', time.toString());
          this.setState({ mainDataArray: [[arrayVars[10], 1000000]] });
        }
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Device Overview</Text>
        </View>
        <ModalDropdown style={styles.dropdown}
        options={this.state.graphList}
        textStyle={styles.dropdownText}
        dropdownStyle={styles.dropdownDropdown1}
        defaultValue='Change Graph Type'
        renderRow={this.dropdownRenderRow}
        onSelect={this.viewGraph}
        />
        <ModalDropdown style={styles.dropdown}
          options={this.state.graphTimeList}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownDropdown2}
          defaultValue='Change Graph Time'
          renderRow={this.dropdownRenderRow}
          onSelect={this.viewTimeGraph}
        />
        <Chart
          color={'white'}
          axisColor={'white'}
          axisLabelColor={'white'}
          axisLineWidth={1}

          xAxisHeight={40}
          yAxisWidth={50}
          yAxisShortLabel={true}

          cornerRadius={4}

          data={this.state.mainDataArray}

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
          labelFontSize={10}
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
      this.setState({graphType: 'bar'});
      this.setState({graphshowAxes: true});
    }
    if (value=='line')
    {
      this.setState({graphType: 'line'});
      this.setState({graphshowAxes: true});
    }
  }

  viewTimeGraph(index, value) {
     AsyncStorage.multiGet(['email', 'token'], (errors, results) => {
      if (errors) {
        Alert.alert('Error', errors);
      }
      let email = results[0][1];
      let token = results[1][1];
      // let now = new Date();
      // let hourAgo = new Date();
      // hourAgo.setHours(hourAgo.getHours()-1);//token, email, date, meterID=1,
    //daily from back-end
      fetch(`http://138.68.56.236:3000/api/getDailyUsage?date=${encodeURI(Date.now())}&meterID=1`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': token
        }
      })
      .then((response) => response.json())
      .then((responseObject) => {
        let dataMlUsageHr = responseObject.data;
        if (Array.isArray(dataMlUsageHr)) {
          let dataDay = [
            ['8a', dataMlUsageHr[0]],
            ['9a', dataMlUsageHr[1]],
            ['10a', dataMlUsageHr[2]],
            ['11a', dataMlUsageHr[3]],
            ['12p', dataMlUsageHr[4]],
            ['1p', dataMlUsageHr[5]],
            ['2p', dataMlUsageHr[6]],
            ['3p', dataMlUsageHr[7]],
            ['4p', dataMlUsageHr[8]],
            ['5p', dataMlUsageHr[9]],
            ['6p', dataMlUsageHr[10]],
            ['7p', dataMlUsageHr[11]]
          ];
          if (value=='daily') {
            this.setState({mainDataArray: dataDay });
          }
        } else {
          let dataDay = [['', 0]];
          if (value=='daily') {
            this.setState({mainDataArray: dataDay });
          }
        }
      });

  //weekly
    fetch(`http://138.68.56.236:3000/api/getWeeklyUsage?date=${encodeURI(Date.now())}&meterID=1`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': token
        }
      })
      .then((response) => response.json())
      .then((responseObject) => {
        let dataMlUsageDay = responseObject.data;
        //Alert.alert('response', responseObject.message);
        if (Array.isArray(dataMlUsageDay)) {
          let dataWeek = [
            ['S', dataMlUsageDay[0]],
            ['M', dataMlUsageDay[1]],
            ['T', dataMlUsageDay[2]],
            ['W', dataMlUsageDay[3]],
            ['Th', dataMlUsageDay[4]],
            ['F', dataMlUsageDay[5]],
            ['S', dataMlUsageDay[6]],
          ];
          if (value=='weekly') {
            this.setState({mainDataArray: dataWeek});
          }
        } else {
          let dataWeek = [['', 0]];
          if (value=='weekly') {
            this.setState({mainDataArray: dataWeek});
          }
        }
      });

  //monthly
    fetch(`http://138.68.56.236:3000/api/getMonthlyUsage?year=2017&meterID=1`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': token
        }
      })
      .then((response) => response.json())
      .then((responseObject) => {
        let dataMlUsageMonth = responseObject.data;
        if (Array.isArray(dataMlUsageMonth)) {
          let dataMonth = [
            ['Jan', dataMlUsageMonth[0]],
            ['Feb', dataMlUsageMonth[1]],
            ['Mar', dataMlUsageMonth[2]],
            ['Apr', dataMlUsageMonth[3]],
            ['May', dataMlUsageMonth[4]],
            ['Jun', dataMlUsageMonth[5]],
            ['Jul', dataMlUsageMonth[6]],
            ['Aug', dataMlUsageMonth[7]],
            ['Sep', dataMlUsageMonth[8]],
            ['Oct', dataMlUsageMonth[9]],
            ['Nov', dataMlUsageMonth[10]],
            ['Dec', dataMlUsageMonth[11]],
          ];
          if (value=='monthly') {
            this.setState({mainDataArray: dataMonth});
          }
        } else {
          let dataMonth = [['', 0]];
          if (value=='monthly') {
            this.setState({mainDataArray: dataMonth});
          }
        }
      });
     });
  }
}

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
    height: 70,
    // margin: 1,
    marginTop: 5,
    marginBottom: 190,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    marginTop: 150,
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 2
  },
  dropdown: {
    margin: 2,
    borderColor:  'gray',
    borderWidth: 1,
    borderRadius: 1,
    backgroundColor: 'rgb(31,58,147)',
    width:170,
    height:40,
  },
  dropdownText: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdownDropdown1: {
    margin: 8,
    width: 152,
    height: 80,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: 'rgb(31,58,147)',
  },
  dropdownDropdown2: {
    margin: 8,
    width: 152,
    height: 125,
    borderColor: 'gray',
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
    fontSize: 12,
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
  }
});
