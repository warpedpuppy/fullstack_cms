import React from 'react';
import './App.css';
import Home from './pages/Home';
import Page2 from './pages/Page2';
import NotFound from './pages/NotFound';
import Menu from './components/Menu';
import { Switch, Route } from 'react-router-dom';
import SiteContext from './SiteContext';

class App extends React.Component {
  state = {
    loggedIn: false
  }
  render() {
    const contextValue = {
      loggedIn: this.state.loggedIn
    };
     return (
      <SiteContext.Provider value={contextValue}>
        <header><Menu /></header>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/page2" component={Page2} />
            <Route component={NotFound} />
          </Switch>
        <footer>this is the footer</footer>
      </SiteContext.Provider>
    );
  }
 
}

export default App;
