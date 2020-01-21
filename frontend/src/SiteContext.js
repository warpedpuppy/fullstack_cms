import React from 'react';

const SiteContext = React.createContext({
  loggedIn: false,
  creators: {}
});

export default SiteContext;
