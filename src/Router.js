import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LayoutApp from './components/Layout'
import Home from './pages/Home';
import Buscador from './pages/Buscador';
import NotFound from './components/404/NotFound.js';

const Router = () => (
  <BrowserRouter>
  <LayoutApp>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/buscador/:tipo" component={Buscador} />
      <Route component={NotFound} />
    </Switch>
    </LayoutApp>
  </BrowserRouter>
);

export default Router;
