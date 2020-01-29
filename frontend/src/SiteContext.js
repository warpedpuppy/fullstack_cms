import React from 'react';

const SiteContext = React.createContext({
  articles: [],
  createContextArticles: () =>{},
  goToArticle: () => {},
  gotToCreator: () => {}
});

export default SiteContext;
