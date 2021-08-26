import React from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import FrontEnd from './Components/FrontEnd/FrontEnd';
function App() {
  return (
    <div className="App">
    
                <Switch>
              <Route  path="/" ><FrontEnd/></Route>
              
          </Switch>
    </div>
  );
}

export default App;
