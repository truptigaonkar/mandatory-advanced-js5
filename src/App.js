import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Breadcrumbs from 'react-breadcrumbs';
import "./App.css";
import Start from "./Components/Start";
import Auth from "./Components/Auth";
import Home from "./Components/Home";
import logoImage from "./logo.png";
// import Dropbox from 'dropbox/dropbox'; <-- According to https://dropbox.github.io/dropbox-sdk-js/tutorial-Getting%20started.html
//                                        this should be used with Babel, but this creates an error because 'Dropbox' has already been declared.
import fetch from "isomorphic-fetch";
import queryString from "query-string";
import { token$, updateToken } from "./store.js";
import DropdownToggle from "reactstrap/lib/DropdownToggle";

const navStyle = {
  width: "100%",
  height: "80px",
  margin: "10px 0 0 0",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-end",
};

const logoStyle = {
  width: "50px",
  position: "absolute",
  left: "10px",
  top: "8px"
};

const headerStyle = {
  margin: 0,
  position: "absolute",
  left: "64px",
  top: "24px"
};

function App() {
  return (
    <div className="App">
      <Router>
        <nav style={navStyle}>
          <Link to="/">
            <img src={logoImage} style={logoStyle} />
          </Link>
          <h1 style={headerStyle}>TeaCup</h1>
        </nav>

        <Route exact path="/" component={Start} />
        <Route path="/auth" component={Auth} />
        <Route path="/home" component={Home} />
      </Router>
    </div>
  );
}

export default App;
