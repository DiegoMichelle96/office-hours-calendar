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
      selectedIntervals: [
        {
          start: moment("2021-10-26 08:00:00"),
          end: moment("2021-10-26 08:30:00"),
          fullname: 'test',
          phone: 'owo',
        },
        {
          start: moment("2021-10-27 14:00:00"),
          end: moment("2021-10-27 14:30:00"),
          fullname: 'test',
          phone: 'owo',
        },
        {
          start: moment("2021-11-1 13:00:00"),
          end: moment("2021-11-1 13:30:00"),
          fullname: 'test',
          phone: 'owo',
        },
        {
          start: moment("2021-11-8 09:00:00"),
          end: moment("2021-11-8 09:30:00"),
          fullname: 'test',
          phone: 'owo',
        },
        {
          start: moment("2021-11-10 13:00:00"),
          end: moment("2021-11-10 13:30:00"),
          fullname: 'test',
          phone: 'owo',
        },
        //5
        {
          start: moment("2021-11-18 12:00:00"),
          end: moment("2021-11-18 12:30:00"),
          fullname: 'test',
          phone: 'owo',
        },
        {
          start: moment("2021-11-19 14:00:00"),
          end: moment("2021-11-19 14:30:00"),
          fullname: 'test',
          phone: 'owo',
        },
        {
          start: moment("2021-11-26 09:30:00"),
          end: moment("2021-11-26 10:00:00"),
          fullname: 'test',
          phone: 'owo',
        },
        {
          start: moment("2021-11-28 08:00:00"),
          end: moment("2021-11-28 08:30:00"),
          fullname: 'test',
          phone: 'owo',
        },
        {
          start: moment("2021-11-29 13:00:00"),
          end: moment("2021-11-29 13:30:00"),
          fullname: 'test',
          phone: 'owo',
        },
        //10
        {
          start: moment("2021-11-30 12:30:00"),
          end: moment("2021-11-30 13:00:00"),
          fullname: 'test',
          phone: 'owo',
        },
        {
          start: moment("2021-12-6 10:00:00"),
          end: moment("2021-12-6 10:30:00"),
          fullname: 'test',
          phone: 'owo',
        },
        {
          start: moment("2021-12-8 10:00:00"),
          end: moment("2021-12-8 10:30:00"),
          fullname: 'test',
          phone: 'owo',
        },
        {
          start: moment("2021-12-14 10:00:00"),
          end: moment("2021-12-14 10:30:00"),
          fullname: 'test',
          phone: 'owo',
        },
        {
          start: moment("2021-12-16 10:00:00"),
          end: moment("2021-12-16 10:30:00"),
          fullname: 'test',
          phone: 'owo',
        },
        //15
      ]
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
    let isAppointmentDayRepeated = false;
    let appointmentsInSameWeek = 0;
    const {lastUid, selectedIntervals} = this.state;
    if(hours <= 0.5){     
      selectedIntervals.forEach(element => {
        if(element.start._d.getDate() === newIntervals[0].start._d.getDate() && element.start._d.getMonth() === newIntervals[0].start._d.getMonth()){
          alert("Error: Registering more than one appointment in one day is prohibited");
          isAppointmentDayRepeated = true;
        }
        if(moment(newIntervals[0].start._d).isoWeek() === moment(element.start._d).isoWeek()){
          appointmentsInSameWeek ++;
        }
      });
      if(!isAppointmentDayRepeated){
        if(appointmentsInSameWeek <= 1){
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
        } else{
          alert("Error: Maximum number of appointments (2) in the same week reached. Please try the week after");
        }
      }
    } else {
      alert("Error: Registering more than one appointment in one day is prohibited");
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