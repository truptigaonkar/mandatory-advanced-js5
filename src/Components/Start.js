import React, { useEffect, useState } from 'react';
import { Dropbox } from 'dropbox';
import { Button } from 'reactstrap';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { CLIENT_ID } from '../constants';
import { token$, updateToken } from '../store';
import { h3Style } from './style';

const startButtonStyle = {
  marginTop: "30px"
}

export default function Start(props) {

  const [token, updateToken] = useState(token$.value);

  //Listening to token when the start page is loaded
  useEffect(() => {
    const subscription = token$.subscribe(updateToken);
    return () => subscription.unsubscribe();
  }, []);

  function onClickLogin(event) {

    //Creating dropbox object
    console.log(CLIENT_ID);
    let dropbox = new Dropbox({ clientId: CLIENT_ID });

    //Getting authentication url
    let authUrl = dropbox.getAuthenticationUrl('https://ayumina.github.io/mandatory-advanced-js5/auth');
    // let authUrl = dropbox.getAuthenticationUrl('http://localhost:3000/auth'); //To test locally

    console.log(authUrl);

    //Redirecting
    window.location.href = authUrl;
  }

  if(token) {
    return <Redirect to="/home" />;
  }
  else {
    return (
      <>
        <Helmet>
          <title>Start</title>
        </Helmet>

        <h3 style={h3Style}>File Hosting Service</h3>
        <Button color="success" onClick={onClickLogin} style={startButtonStyle}>Connect</Button>{' '}
      </>
    );
  }
};
