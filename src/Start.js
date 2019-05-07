import React, { useEffect, useState } from 'react';
import { Dropbox } from 'dropbox';
import { Button } from 'reactstrap';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import CLIENT_ID from './App.js';
import h3Style from './App.js';
import { token$, updateToken } from './store.js';

export default function Start(props) {

  const [token, updateToken] = useState(token$.value);

  //Listening to token when the start page is loaded
  useEffect(() => {
    const subscription = token$.subscribe(updateToken);
    return () => subscription.unsubscribe();
  }, []);

  // function onClickLoginOnTestAccount(event) {
  //   console.log('Logging in on test account.');
  //   //Creating an instance of the dropbox object
  //   let dropbox = new Dropbox({ accessToken: ACCESS_TOKEN });
  //
  //   //Testing out that the correct account is linked
  //   dropbox.usersGetCurrentAccount()
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  //
  //   //Fetching all folders
  //   dropbox.filesListFolder({ path: '' })
  //     .then(function (response) {
  //       console.log(response.entries);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // }

  function onClickLogin(event) {
    console.log('Redirecting...');

    //Creating dropbox object
    let dropbox = new Dropbox({ clientId: CLIENT_ID });

    //Getting authentication url
    let authUrl = dropbox.getAuthenticationUrl('http://localhost:3000/auth');

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

        <h3 style={{h3Style}}>File Hosting Service</h3>
        <Button color="success" onClick={onClickLogin}>Connect</Button>{' '}
      </>
    );
  }
};
