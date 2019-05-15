import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "./App.css";
import Start from "./Components/Start";
import Auth from "./Components/Auth";
import Home from "./Components/Home";
import logoImage from "./logo.png";


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
  top: "24px",
  color: "#212529"
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
