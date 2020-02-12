import React from 'react';

const SiteContext = React.createContext({
  articles: [],
  loggedIn: false,
  setLoggedIn: () => {},
  createContextArticles: () =>{},
  goToArticle: () => {},
  gotToCreator: () => {}
});

export default SiteContext;
