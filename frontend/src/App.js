import React from 'react';
import './App.css';
import Home from './pages/Home';
import Page2 from './pages/Page2';
import NotFound from './pages/NotFound';
import Menu from './components/Menu';
import Admin from './pages/Admin';
import { Switch, Route } from 'react-router-dom';
import SiteContext from './SiteContext';
import TokenService from './services/token-service';
import Footer from './components/Footer';

class App extends React.Component {
  state = {
    loggedIn: false
  }
  setLoggedIn = (loggedIn) => {
    this.setState({loggedIn})
  }
  componentDidMount () {
    this.setState({loggedIn: TokenService.hasAuthToken()})
  }
  render() {
    const contextValue = {
      loggedIn: this.state.loggedIn,
      setLoggedIn: this.setLoggedIn
    };
     return (
      <SiteContext.Provider value={ contextValue }>
        <header><Menu /></header>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/page2" component={ Page2 } />
            <Route path="/admin" component={ Admin } />
            <Route component={ NotFound } />
          </Switch>
        <Footer />
      </SiteContext.Provider>
    );
  }
}

export default App;
