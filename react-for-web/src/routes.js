import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import App from "./App";
import ShoppingCart from "./components/ShoppingCart/shoppingCart";
import MainPage from "./components/MainPage/mainPage";
import history from "./history";

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/shoppingCart" exact component={ShoppingCart} />
          <Route path="/mainPage" exact component={MainPage} />
        </Switch>
      </Router>
    );
  }
}
