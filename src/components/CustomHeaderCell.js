import React from 'react';

const customHeaderCell = (props) => {
  let dateObj = props.date._d;
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  let dayOfWeek;
  switch (dateObj.getDay()) {
    case 1:
      dayOfWeek = "Monday"
      break;
    case 2:
      dayOfWeek = "Tuesday"
      break;
    case 3:
      dayOfWeek = "Wednesday"
      break;
    case 4:
      dayOfWeek = "Thursday"
      break;
    case 5:
      dayOfWeek = "Friday"
      break;
    case 6:
      dayOfWeek = "Saturday"
      break;
    case 0:
      dayOfWeek = "Sunday"
      break;
    default:
      break;
  }
  let header = dayOfWeek + " " + year + "/" + month + "/" + day;
  return(<span>{header}</span>)
}

export default customHeaderCell;