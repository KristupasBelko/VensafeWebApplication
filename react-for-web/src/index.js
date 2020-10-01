import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { HashRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { Provider } from "react-redux";
import { store } from "./Actions/store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="App">
        <Routes />
      </div>
    </Router>
  </Provider>,

  document.getElementById("root")
);
