import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './containers/homePage';
import SignIn from './containers/Login';
import SignUp from './containers/Signup';
import NotFound from './containers/NotFound/notFound';
import Header from './components/Header/Header';
import ActivItem from './containers/Activ/ActivItem';
import Activ from './containers/Activ/activ';
import Progress from './containers/progress';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/progress" component={Progress} />
        <Route path="/activItem" component={ActivItem} />

        <Route path="/activ/:activId" component={Activ} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
