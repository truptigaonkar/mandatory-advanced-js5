import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import './Home.css';
import { Dropbox } from 'dropbox';

let ACCESS_TOKEN = 'u0siLycEZIAAAAAAAAAA3NVwbhi2hLMF8YtFvS6mL9qzqE2Bb9qNuivhETRLV3hE';

function Home(props) {

 const [data, updateData] = useState([]);

 useEffect(() => {

   let dropbox = new Dropbox({accessToken: ACCESS_TOKEN});

      //Fetching all folders
      dropbox.filesListFolder({path: ''})
      .then(function(response) {
        console.log("Response: ", response.entries);      
        updateData(response.entries);
      })
      .catch(function(error) {
        console.error(error);
      });
      
 }, []);

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