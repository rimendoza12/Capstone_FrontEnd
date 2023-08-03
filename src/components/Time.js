import React, { useState } from 'react';

const Time = ({ onSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    onSelect(e.target.value, selectedTime);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
    onSelect(selectedDate, e.target.value);
  };

  return (
    <div>
      <input type="date" value={selectedDate} onChange={handleDateChange} />
      <input type="time" value={selectedTime} onChange={handleTimeChange} />
    </div>
  );
};

export default Time;