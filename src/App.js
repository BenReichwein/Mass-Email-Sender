import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import listContacts from './components/listContacts'
import addContacts from './components/addContacts'
import sendEmail from './components/sendEmail'
import './App.css';

function App() {
  return (
      <Router>
          <div className="App">
              <Switch>
                  <Route exact path="/listcontacts" component={listContacts} />
                  <Route exact path="/addcontacts" component={addContacts} />
                  <Route exact path="/sendemail" component={sendEmail} />
              </Switch>
          </div>
      </Router>
  );
}

export default App;