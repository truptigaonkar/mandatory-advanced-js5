import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import './Home.css';
import { Dropbox } from 'dropbox';
import { token$, updateToken } from './Store.js';

let ACCESS_TOKEN = 'u0siLycEZIAAAAAAAAAA3NVwbhi2hLMF8YtFvS6mL9qzqE2Bb9qNuivhETRLV3hE';

function Home(props) {

 const [data, updateData] = useState([]);
 const [token, updateToken] = useState(token$.value);

 useEffect(() => {
  const subscription = token$.subscribe(updateToken);
  return () => subscription.unsubscribe();
 }, []);

 useEffect(() => {

    if (token) {
   let dropbox = new Dropbox({accessToken: token});

      //Fetching all folders
      dropbox.filesListFolder({path: ''})
      .then(function(response) {
        console.log("Response: ", response.entries);      
        updateData(response.entries);
      })
      .catch(function(error) {
        console.error(error);
      });
    }
      
 }, [token]);

 console.log("Data: ", data);
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {
        data.length === 0 ? <div>Loading...</div> :
        <table border='1'>
          <thead>
            <tr>
              <th>File type</th>
              <th>File name</th>
              <th>Last modified</th>
              <th>Size</th>  
            </tr>
          </thead>
          <tbody>
            {data.map((file) => {
              return (
                <tr key={file.id}>
                  <td>{file[".tag"]}</td>
                  <td>{file.name}</td>
                  <td></td>
                  <td></td>
                </tr>
              )
            })}
          </tbody>
       </table>
      }

    </>
  );
}

export default Home;