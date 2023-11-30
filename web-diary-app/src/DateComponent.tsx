import React, { useState, ChangeEvent } from 'react';

const DateComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    newDate.setHours(0, 0, 0, 0); // Set time to midnight
    setSelectedDate(newDate);
  };

  return (
    <div>
      <label htmlFor="datePicker">Select a Date:</label>
      <input
        type="date"
        id="datePicker"
        value={selectedDate.toISOString().split('T')[0]}
        onChange={handleDateChange}
      />
      <input type="text" value={selectedDate.toDateString()} readOnly />
    </div>
  );
};

export default DateComponent;
