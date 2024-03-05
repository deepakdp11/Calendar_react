import React, { useState } from 'react';
import './styles/calendar.css'; 
import Calendar from './components/Calendar';

function App() {
  const [showCalendar, setShowCalendar] = useState(false);

  
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className="App">
      <button className='togglebutton' onClick={toggleCalendar}>Calendar</button>
      {showCalendar && <Calendar />}
    </div>
  );
}

export default App;

