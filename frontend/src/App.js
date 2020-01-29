import React from 'react';
import './App.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Menu from './components/Menu';
import Admin from './pages/Admin';
import CreatorPage from './pages/CreatorPage';
import { Switch, Route } from 'react-router-dom';
import SiteContext from './SiteContext';
import Footer from './components/Footer';
import ArticleService from './services/article-service';
import Article from './pages/Article';
import { withRouter } from 'react-router-dom';

class App extends React.Component {
  state = {
    articles: [],
  }
  setArticles = (articles) => {
    this.setState({articles})
  }
  goToCreator = (author_id) => {
    this.props.history.push(`/creator/${author_id}`)
}
  goToArticle = (creator, index) => {
     this.props.history.push(`/article/${creator}/${index}`)
  }
  componentDidMount () {
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
    };
     return (
      <SiteContext.Provider value={ contextValue }>
        <header><Menu /></header>
          <Switch>
            <Route exact path="/" render={(history) => <Home articles={this.articles} history={history} />} />
            <Route path="/admin" component={ Admin } />
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
