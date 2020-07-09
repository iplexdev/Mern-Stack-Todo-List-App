import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-notifications/lib/notifications.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import ListComponent from './component/list.js';
import EditComponent from './component/edit.js';
import CreateComponent from './component/create.js';
import { NotificationContainer } from 'react-notifications';
function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">
          <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
        </a>
        <Link to="/" className="navbar-brand">MERN TODO APP</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/create" className="nav-link">Create Todo</Link>
            </li>
          </ul>
        </div>
      </nav>
      <NotificationContainer />
      <br/>
      <Route path="/" exact component={ListComponent} />
      <Route path="/edit/:id" component={EditComponent} />
      <Route path="/create" component={CreateComponent} />
      
  </Router>
  );
}

export default App;
