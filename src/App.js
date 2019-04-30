import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from 'reactstrap';
import './App.css';
import Home from './Home';
import Favorite from './Favorite';
import logoImage from './logo.png';

const h3Style = {
  marginTop: "60px"
}

const navStyle = {
  width: "100%",
  marginLeft: "10px",
  display:  "flex",
  justifyContent: "flex-start",
  alignItems: "flex-end"
}

const logoStyle = {
  width: "50px",
  position: "absolute",
  left: "10px",
  top: "8px"
}

const headerStyle = {
  margin: 0,
  position: "relative",
  left: "60px",
  top: "20px"
}

const Start = () => (
  <>
    <Helmet>
      <title>Start</title>
    </Helmet>
    
    <h3 style={h3Style}>File Hosting Service</h3>
    <Button color="success">Connect</Button>{' '}
  </>
);



function App() {
  return (
    <div className="App">
      <Router>
        <nav style={navStyle}>
          <Link to="/"><img src={logoImage} style={logoStyle} /></Link>
          <h1 style={headerStyle}>TeaCup</h1>
        </nav>
        <Start />
        <Route exact path="/" component={Home} />
        <Route path="/favorite" component={Favorite} />
      </Router>
    </div >
  );
}

export default App;
