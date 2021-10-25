import React from 'react';
import moment from 'moment';
import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';
import '../css/calendar.css'

import CustomHeaderCell from './CustomHeaderCell';
import CustomDayCell from './CustomDayCell';
import CustomModal from './CustomModal';
import CustomEvent from './CustomEvent';


export default class CustomCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lastUid: 1,
      selectedIntervals: []
    }
  }

  handleEventRemove = (event) => {
    const {selectedIntervals} = this.state;
    const index = selectedIntervals.findIndex((interval) => interval.uid === event.uid);
    if (index > -1) {
      selectedIntervals.splice(index, 1);
      this.setState({selectedIntervals});
    }

  }

  handleEventUpdate = (event) => {
    const {selectedIntervals} = this.state;
    const index = selectedIntervals.findIndex((interval) => interval.uid === event.uid);
    if (index > -1) {
      selectedIntervals[index] = event;
      this.setState({selectedIntervals});
    }
  }

  handleSelect = (newIntervals) => {
    let hours = Math.abs(newIntervals[0].end._d - newIntervals[0].start._d) / 36e5;
    const {lastUid, selectedIntervals} = this.state;
    if(hours <= 1){     
      selectedIntervals.forEach(element => {
        if(element.start._d.getDate() === newIntervals[0].start._d.getDate() && element.start._d.getMonth() === newIntervals[0].start._d.getMonth()){
          alert('no se puede hacer citas en el mismo dia');
        }
      });
      const intervals = newIntervals.map( (interval, index) => {
        return {
          ...interval,
          uid: lastUid + index
        }
      });
  
      this.setState({
        selectedIntervals: selectedIntervals.concat(intervals),
        lastUid: lastUid + newIntervals.length
      })
    } else {
      alert("Error: Registering more than two appointments in one week is prohibited");
    }
    
  }

  render() {
    return <WeekCalendar
      startTime = {moment({h: 8, m: 0})}
      endTime = {moment({h: 21, m: 0})}
      scaleUnit ={30}
      scaleHeaderTitle="Time"
      cellHeight = {50}
      numberOfDays= {7}
      selectedIntervals = {this.state.selectedIntervals}
      onIntervalSelect = {this.handleSelect}
      onIntervalUpdate = {this.handleEventUpdate}
      onIntervalRemove = {this.handleEventRemove}
      headerCellComponent={CustomHeaderCell}
      dayCellComponent={CustomDayCell}
      modalComponent={CustomModal}
      eventComponent={CustomEvent}
    />
  }
}