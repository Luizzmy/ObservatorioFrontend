import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LayoutApp from './components/Layout'
import Home from './pages/Home';
import Buscador from './pages/Buscador';
import NotFound from './components/404/NotFound.js';
import Escenarios from './pages/Escenarios';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <LayoutApp>
      <Route path="/buscador/:tipo" component={Buscador} />
      <Route path="/escenarios" component={Escenarios} />
      <Route component={NotFound} />
      </LayoutApp>
    </Switch>
  </BrowserRouter>
);

export default Router;
