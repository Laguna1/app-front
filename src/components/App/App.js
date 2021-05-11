import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
      <BrowserRouter>
        <Switch>
          <Route path="/" />
          <Route path="/activityform">
            <ActivityForm />
          </Route>
          <Route path="/trackingform">
            <TrackingForm />
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
