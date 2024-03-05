import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import data from './data.json'; 

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [timezone, setTimezone] = useState('UTC-0');
  const [workingDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  const [times] = useState([
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
  ]);

  const [selectedSlots, setSelectedSlots] = useState({});

  useEffect(() => {
    
    const initialSelectedSlots = {};
    data.forEach(item => {
      const day = item.Date;
      initialSelectedSlots[day] = initialSelectedSlots[day] || {};
      initialSelectedSlots[day][item.Time] = true;
    });
    setSelectedSlots(initialSelectedSlots);
  }, []);

  const handlePreviousWeek = () => {
    setDate(moment(date).subtract(1, 'weeks').toDate());
  };

  const handleNextWeek = () => {
    setDate(moment(date).add(1, 'weeks').toDate());
  };

  const handleTimezoneChange = (event) => {
    setTimezone(event.target.value);
  };

  const handleCheckboxChange = (day, time) => {
    setSelectedSlots(prevSlots => ({
      ...prevSlots,
      [day]: {
        ...prevSlots[day],
        [time]: !prevSlots[day]?.[time]
      }
    }));
  };

  const getDisplayTime = (time) => {
    return moment(time, 'HH:mm').tz(timezone).format('h:mm A');
  };

  const renderCalendar = () => {
    return (
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={handlePreviousWeek}>Previous Week</button>
          <span>{moment(date).format('MMMM Do, YYYY')}</span>
          <button onClick={handleNextWeek}>Next Week</button>
        </div>
        <div>
          <span className='timezone-name'><h4>Timezone:</h4></span>
          <select className='timezone-select' value={timezone} onChange={handleTimezoneChange}>
            <option value="UTC-0">UTC-0</option>
            <option value="America/New_York">Eastern Standard Time</option>
          </select>
        </div>
        <div className="calendar-body">
          <div className="calendar-days-and-slots">
            {workingDays.map((day, index) => (
              <div key={day} className="calendar-day">
                <span className="day-and-date">
                  <div className='day-name'>
                    {moment(date).add(index, 'days').format('ddd ')}
                  </div>
                    {moment(date).add(index, 'days').format(' MM/DD')}
                </span>
                <div className="calendar-time-slots">
                  {times.map((time) => (
                    <div className="calendar-time-slot" key={time}>
                      <input
                        type="checkbox"
                        checked={selectedSlots[moment(date).add(index, 'days').format('YYYY-MM-DD')]?.[time] || false}
                        onChange={() => handleCheckboxChange(moment(date).add(index, 'days').format('YYYY-MM-DD'), time)}
                      />
                      <br />
                      <span className="time-label">{getDisplayTime(time)}</span>
                    </div>
                  ))}
                </div>
                <br />
              </div>
            ))}
          </div>
          {data.filter(item => {
            const itemDate = moment(item.Date);
            const startDateOfWeek = moment(date).startOf('week');
            const endDateOfWeek = moment(date).endOf('week');
            return itemDate.isBetween(startDateOfWeek, endDateOfWeek, null, '[]');
          }).map((item) => (
            <div className='jsonfetched-data' key={item.Id}>
              <span>{item.Name}</span>
              <br />
              <span>{item.Date}</span>
              <br />
              <span>{item.Time}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return renderCalendar();
};

export default Calendar;
