import React from 'react';

const customDayCell = (props) => {
  //Saturdays are always closed
  if(props.startTime._d.getDay() === 6){
    return (<div className="customCell customCell_close">Closed</div>);
  }
  //Sundays are open from 8am to 2pm with a break from 11 to 11:30 am only if they are even days
  if(props.startTime._d.getDay() === 0 && !props.startTime._d.getDate() % 2){
    return (<div className="customCell customCell_10" onMouseDown={props.startSelection}>DOMINGO PAR</div>);
  } else if(props.startTime._d.getDay() === 0 && props.startTime._d.getDate() % 2){
    return (<div className="customCell customCell_close">Closed</div>);
  }

  if(props.startTime._d.getDate() % 2){

    //CASE: day is ODD
    if(props.startTime.hour() < 13 || props.startTime.hour() >= 19){
      return (<div className="customCell customCell_close">Closed</div>);
    }
    if(props.startTime.hour() >= 16 && props.startTime.hour() < 17){
      return (<div className="customCell customCell_break">Break time</div>);
    }
    else {
      return (<div className="customCell customCell_10" onMouseDown={props.startSelection}>Available</div>);
    }
  } 
  else 
  {
    //CASE: day is EVEN
    if(props.startTime.hour() >= 14){
      return (<div className="customCell customCell_close">Closed</div>);
    }
    if(props.startTime.hour() >= 11 && props.startTime.hour() < 12){
      return (<div className="customCell customCell_break">Break time</div>);
    }
    return (<div className="customCell customCell_10" onMouseDown={props.startSelection}>Available</div>);
  }
}


export default customDayCell;