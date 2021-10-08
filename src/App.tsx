import React from 'react';
import Home from './pages/Home/home';
import SearchYear from './components/searchYear/SearchYear';
import SearchProfile from './pages/SearchProfile';
import Affiches from './pages/Affiches/Affiches';
import {
  BrowserRouter as Router,
  Route, 
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route path="/searchYear" exact render={(props) => <SearchYear {...props} /> } />
      <Route path="/searchProfile" exact render={(props) => <SearchProfile {...props} /> } />
      <Route path='/affiches' exact component={Affiches} />
      <Route path="/" exact component={Home} />
    </Router>
  )
}

export default App;
