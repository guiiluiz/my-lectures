import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';
import Events from './pages/Events';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EventDetails from './pages/EventDetails';
import ConfirmedEvents from './pages/ConfirmedEvents';
import CreateEvent from './pages/CreateEvent';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/events" component={Events} />
          <Route path="/events/:id" component={EventDetails} />
          <Route path="/profile" component={Profile} />
          <Route path="/confirmed" component={ConfirmedEvents} />
          <Route path="/create" component={CreateEvent} />
        </Switch>
      </Router>
  );
}

export default App;
