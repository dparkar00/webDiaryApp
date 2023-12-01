import React, { ChangeEvent } from 'react';

interface DateComponentProps {
  selectedDate: string;
  onSelectDate: (selectedDate: string) => void;
}

const DateComponent: React.FC<DateComponentProps> = ({ selectedDate, onSelectDate }) => {
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSelectDate(event.target.value);
  };

  return (
    <div>
      <label htmlFor="datePicker">Select a Date:</label>
      <input
        type="date"
        id="datePicker"
        value={selectedDate}
        onChange={handleDateChange}
      />
      <input type="text" value={selectedDate} readOnly />
    </div>
  );
};

export default DateComponent;