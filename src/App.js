import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


import './App.css';
import './mystyle.css';

import EmpSelect from './EmpSelect'
import EmpCreation from './EmpCreation'
import EmpUpdate from './EmpUpdate'
import EmpDelete from './EmpDelete'

  class App extends React.Component{
   
      render() {
                                      
      return (
                <div className ="App">
              <h3 className="titlenamecss">Employee Management</h3>
              <h4 className="authorcss">Open Book Assignment submitted by R.Usha </h4>
              
          <Router>
<div>   
<nav className="navbar navbar-expand-lg">
<ul className="navbar-nav mr-auto">
<li><Link to={'/'} className="nav-link">Create</Link></li>
<li><Link to={'/read'} className="nav-link">Read</Link></li>
<li><Link to={'/update'} className="nav-link">Update</Link></li>
<li><Link to={'/delete'} className="nav-link">Delete</Link></li>
</ul>
</nav>
<hr />
<Switch>
<Route exact path='/' component={EmpCreation} />
<Route path='/read' component={EmpSelect} />
<Route path='/update' component={EmpUpdate} />
<Route path='/delete' component={EmpDelete} />
</Switch>
</div>
</Router>
                </div> 
            );
      }
   }

    export default App;
