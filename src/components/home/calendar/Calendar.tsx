import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./calendar.css";

type CalendarProps = {
  onSelectedDateChange: (date: Date) => void;
  courseEndDate: Date | null;
};

const Calendar = (props: CalendarProps) => {
  const { onSelectedDateChange, courseEndDate } = props;
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div>
      <DatePicker
        wrapperClassName="datePickerWrapperClass"
        selected={selectedDate}
        minDate={new Date()}
        maxDate={courseEndDate !== null ? courseEndDate : undefined}
        onChange={(date) => {
          if (date != null) {
            setSelectedDate(date);
            onSelectedDateChange(date);
          }
        }}
        inline
      />
    </div>
  );
};

export default Calendar;
