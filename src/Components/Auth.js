import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { token$, updateToken } from '../store';

export default function Auth(props) {
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
