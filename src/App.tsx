import React from 'react';
import Home from './pages/Home/home';
import SearchYear from './components/searchYear/SearchYear';
import SearchProfile from './pages/SearchProfile';
import Affiches from './pages/Affiches/Affiches';
import {
  BrowserRouter as Router,
  Route, 
} from 'react-router-dom';
import { PlayersContext } from './contex/PlayersContext';
import usePool from './hooks/SearchPlayer/usePool';

function App() {
  const Players = usePool();

  return (
    <PlayersContext.Provider value={{players:Players}}>
    <Router>
      <Route path="/searchYear" exact render={(props) => <SearchYear {...props} /> } />
      <Route path="/searchProfile" exact render={(props) => <SearchProfile {...props} /> } />
      <Route path='/affiches' exact component={Affiches} />
      <Route path="/" exact component={Home} />
    </Router>
    </PlayersContext.Provider>
  )
}

export default App;
