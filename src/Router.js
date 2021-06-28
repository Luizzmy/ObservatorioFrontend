import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LayoutApp from './components/Layout'
import Login from './pages/Login';
import Buscador from './pages/Buscador';
import NotFound from './components/404/NotFound.js';
import Escenarios from './pages/Escenarios';
import Demograficos from './pages/Demograficos';
import ResumenEdo from './pages/ResumenEdo';
import ResumenAct from './pages/ResumenAct';

const Router = () => (

  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <LayoutApp>
      <Route path="/buscador/:tipo" component={Buscador} />
      <Route path="/escenarios" component={Escenarios} />
      <Route path="/demograficos" component={Demograficos} />
      <Route path="/resumenEstados" component={ResumenEdo} />
      <Route path="/resumenPensionario" component={ResumenAct} />
      </LayoutApp>
      {/* <Route component={NotFound} /> */}
    </Switch>
  </BrowserRouter>
);

export default Router;
