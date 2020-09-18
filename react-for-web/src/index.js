import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
