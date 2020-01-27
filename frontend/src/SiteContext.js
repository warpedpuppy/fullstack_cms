import React from 'react';

const SiteContext = React.createContext({
  loggedIn: false,
  creators: {},
  setCreators: function(){}
});

export default SiteContext;
