import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import "./i18n";

const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading..</h3>
  </div>
);

const store = configureStore();

ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <Provider store={store}>
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
    </Provider>
  </Suspense>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
