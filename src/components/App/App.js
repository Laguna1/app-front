import React from 'react';
import './App.css';
import Header from '../Header/Header';
import ActivityForm from '../ActivityForm/ActivityForm';
import TrackingForm from '../TrackingForm/TrackingForm';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <p className="h1">Hi there (APP FRONT)!!!</p>
      <ActivityForm />
      <TrackingForm />
      <Footer />
    </div>
  );
}

export default App;
