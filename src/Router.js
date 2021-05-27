import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LayoutApp from './components/Layout'
import Home from './pages/Home';
import NotFound from './components/404/NotFound.js';

const Router = () => (
  <BrowserRouter>
  <LayoutApp>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
    </LayoutApp>
  </BrowserRouter>
);

export default Router;
