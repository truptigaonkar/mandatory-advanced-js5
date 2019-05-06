import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from 'reactstrap';
import './App.css';
import Home from './Home';
import Favorite from './Favorite';
import logoImage from './logo.png';
import { Dropbox } from 'dropbox';
//import Start from './Start';
// import Dropbox from 'dropbox/dropbox'; <-- According to https://dropbox.github.io/dropbox-sdk-js/tutorial-Getting%20started.html
//                                        this should be used with Babel, but this creates an error because 'Dropbox' has already been declared.
import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import { token$, updateToken } from './Store.js';

let ACCESS_TOKEN = 'u0siLycEZIAAAAAAAAAA3NVwbhi2hLMF8YtFvS6mL9qzqE2Bb9qNuivhETRLV3hE';
let CLIENT_ID = '708xp4tm8gf03u3';

const h3Style = {
  marginTop: "60px"
}

const navStyle = {
  width: "100%",
  marginLeft: "10px",
  display: "flex",
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

// const Start = (props) => (
//   <>
//     <Helmet>
//       <title>Start</title>
//     </Helmet>

//     <h3 style={h3Style}>File Hosting Service</h3>
//     <Button color="success" onClick={props.onClickConnect}>Connect</Button>{' '}
//   </>
// );

const Start = (props) => {
  function onClickLoginOnTestAccount(event) {
    console.log('Logging in on test account.');
    //Creating an instance of the dropbox object
    let dropbox = new Dropbox({ accessToken: ACCESS_TOKEN });

    //Testing out that the correct account is linked
    dropbox.usersGetCurrentAccount()
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });

    //Fetching all folders
    dropbox.filesListFolder({ path: '' })
      .then(function (response) {
        console.log(response.entries);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function onClickLogin(event) {
    console.log('Redirecting...');

    //Creating dropbox object
    let dropbox = new Dropbox({ clientId: CLIENT_ID });

    //Getting authentication url
    let authUrl = dropbox.getAuthenticationUrl('http://localhost:3000/auth');

    //Redirecting
    window.location.href = authUrl;
  }

  return (
    <>
      <Helmet>
        <title>Start</title>
      </Helmet>

      <h3 style={h3Style}>File Hosting Service</h3>
      <Button color="success" onClick={onClickLogin}>Connect</Button>{' '}
    </>
  );
};

function Auth(props) {
  //States
  const [redirect, updateRedirect] = useState(false);

  function fetchAccessToken() {
    let location = props.location; //The Route component has a prop called location
    let parsedHash = queryString.parse(location.hash);
    let accessToken = parsedHash.access_token;
    updateToken(accessToken);

    //Then, redirecting...
    updateRedirect(true);
  }

  //When the auth component is loaded, fetch the access token from the URL
  useEffect(fetchAccessToken, []);

  if(redirect) {
    return <Redirect to="/"/>;
  }
  else {
    return <p>Redirecting...</p>;
  }
}

function App() {
  return (
    <div className="App">
      <Router>
        <nav style={navStyle}>
          <Link to="/"><img src={logoImage} style={logoStyle} /></Link>
          <h1 style={headerStyle}>TeaCup</h1>
        </nav><br /><br />
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth}/>
        {/* <Route path="/home" component={Home} /> */}
        <Route path="/start" component={Start}/>
        <Route path="/favorite" component={Favorite} />
      </Router>
    </div >
  );
}

export default App;
