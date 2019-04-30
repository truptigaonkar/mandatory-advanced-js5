import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from 'reactstrap';
import './App.css';
import Home from './Home';
import Favorite from './Favorite';
import logoImage from './logo.png';
import { Dropbox } from 'dropbox';
// import Dropbox from 'dropbox/dropbox'; <-- According to https://dropbox.github.io/dropbox-sdk-js/tutorial-Getting%20started.html
//                                        this should be used with Babel, but this creates an error because 'Dropbox' has already been declared.
import fetch from 'isomorphic-fetch';

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

const Start = (props) => (
  <>
    <Helmet>
      <title>Start</title>
    </Helmet>

    <h3 style={h3Style}>File Hosting Service</h3>
    <Button color="success" onClick={props.onClickConnect}>Connect</Button>{' '}
  </>
);



function App() {
  function onClickConnect(event) {
    console.log('connecting');
  }

  return (
    <div className="App">
      <Router>
        <nav style={navStyle}>
          <Link to="/"><img src={logoImage} style={logoStyle} /></Link>
          <h1 style={headerStyle}>TeaCup</h1>
        </nav>
        <Start onClickConnect={onClickConnect}/>
        <Route exact path="/" component={Home} />
        <Route path="/favorite" component={Favorite} />
      </Router>
    </div >
  );
}

export default App;
