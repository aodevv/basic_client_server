import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./components/App";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import Welcome from "./components/Welcome";
import Singup from "./components/auth/Singup";
import Feature from './components/Feature'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Routes>
          <Route path="/" exact element={<Welcome />} />
          <Route path="/signup" exact element={<Singup />} />
          <Route path="/feature" exact element={<Feature />} />
        </Routes>
      </App>
    </Router>
  </Provider>,
  document.getElementById("root")
);
