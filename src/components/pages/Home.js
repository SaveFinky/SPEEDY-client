import React from 'react';
import '../../App.css';
import WeekSelector from '../weekselector/WeekSelector';
import Footer from '../footer/Footer';

function Home() {
  return (
    <>
      <WeekSelector/>
      <hr className='foot'></hr>
      <hr className='foot'></hr>
      <Footer />
    </>
  );
}

export default Home;
