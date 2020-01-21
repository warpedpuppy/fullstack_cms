import React from 'react';
import './App.css';
import Home from './pages/Home';
import Page2 from './pages/Page2';
import NotFound from './pages/NotFound';
import Menu from './components/Menu';
import Admin from './pages/Admin';
import CreatorPage from './pages/CreatorPage';
import { Switch, Route } from 'react-router-dom';
import SiteContext from './SiteContext';
import TokenService from './services/token-service';
import Footer from './components/Footer';
import CreatorService from './services/creators-service';

class App extends React.Component {
  state = {
    loggedIn: false,
    creators: {}
  }
  setLoggedIn = (loggedIn) => {
    this.setState({loggedIn})
  }
  setCreators = (creators) => {
    this.setState({creators})
  }
  getCreatorData = () => {
     CreatorService.getAllUsers()
    .then(result => {
        this.setCreators(result.creators)
    })
  }
  componentDidMount () {
    this.setState({loggedIn: TokenService.hasAuthToken()})
    this.getCreatorData();
   

  }
  render() {
    const contextValue = {
      loggedIn: this.state.loggedIn,
      setLoggedIn: this.setLoggedIn,
      creators: this.state.creators,
      setCreators: this.setCreators,
      getCreatorData: this.getCreatorData
    };
     return (
      <SiteContext.Provider value={ contextValue }>
        <header><Menu /></header>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/page2" component={ Page2 } />
            <Route path="/admin" component={ Admin } />
            <Route path="/creator/:name" component={ CreatorPage } />
            <Route component={ NotFound } />
          </Switch>
        <Footer />
      </SiteContext.Provider>
    );
  }
}

export default App;
