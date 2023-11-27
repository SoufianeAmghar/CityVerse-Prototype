import React from 'react';
import './dateTimeDisplay.css'

const DateTimeDisplay = ({ value,min }) => {
  return (
    <div className='display123'>
      <p>{min}:</p>
      <p>{value}</p>
    </div>
  );
};

export default DateTimeDisplay;