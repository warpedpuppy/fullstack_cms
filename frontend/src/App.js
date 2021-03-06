import React from 'react';
import './App.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Menu from './components/Menu';
import Admin from './pages/Admin';
import Events from './pages/Events';
import Event from './pages/Event.js';
import CreatorPage from './pages/CreatorPage';
import { Switch, Route } from 'react-router-dom';
import SiteContext from './SiteContext';
import Footer from './components/Footer';
import ArticleService from './services/article-service';
import Article from './pages/Article';
import { withRouter } from 'react-router-dom';
import Utils from './services/utils';
import TokenService from './services/token-service';
class App extends React.Component {
  state = {
    articles: [],
    loggedIn: false
  }
  setLoggedIn = (loggedIn) => {
    this.setState({loggedIn})
  }
  setArticles = (articles) => {
    let shuffled = Utils.shuffled(articles)
    this.setState({articles: shuffled})
  }
  goToCreator = (author_id) => {
    this.props.history.push(`/creator/${author_id}`)
}
  goToArticle = (creator, index) => {
     this.props.history.push(`/article/${creator}/${index}`)
  }
  componentDidMount () {
  this.setLoggedIn(TokenService.hasAuthToken())
   ArticleService.getHomePageArticles()
    .then(res => {
        this.articles = [...res.result]
        this.setArticles(res.result)
    })
  }
  render() {
    const contextValue = {
      articles: this.state.articles,
      goToArticle: this.goToArticle,
      goToCreator: this.goToCreator,
      loggedIn: this.state.loggedIn,
      setLoggedIn: this.setLoggedIn
    };

     return (
      <SiteContext.Provider value={ contextValue }>
        <header><Menu /></header>
          <Switch>
            <Route exact path="/" render={(history) => <Home articles={this.articles} history={history} />} />
            <Route path="/admin" component={ Admin } />
            <Route path="/events" component={ Events } />
            <Route path="/event/:id" component={ Event } />
            <Route path="/creator/:author_id" component={ CreatorPage } />
            <Route path="/article/:name/:index" component={ Article } />
            <Route component={ NotFound } />
          </Switch>
        <Footer />
      </SiteContext.Provider>
    );
  }
}

export default withRouter(App);
