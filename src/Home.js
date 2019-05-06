import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import './Home.css';
import { Dropbox } from 'dropbox';
import { token$, updateToken } from './Store.js';

let ACCESS_TOKEN = 'u0siLycEZIAAAAAAAAAA3NVwbhi2hLMF8YtFvS6mL9qzqE2Bb9qNuivhETRLV3hE';

function Home(props) {

  const [data, updateData] = useState([]);
  const [token, updateToken] = useState(token$.value);
  const [search, updateSearch] = useState('');

  // Using this instead of helmet because it was causing problem while search
  useEffect(() => {
    document.title = "Home";
  })

  useEffect(() => {
    const subscription = token$.subscribe(updateToken);
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {

    // If token exists
    if (token) {

      let dropbox = new Dropbox({ accessToken: token });

      // if then else for search
      if (!search) {
        //Fetching all folders
        dropbox.filesListFolder({ path: '' })
          .then(function (response) {
            console.log("Response: ", response.entries);
            updateData(response.entries);
          })
          .catch(function (error) {
            console.error(error);
          });
      } else {
        // Search
        dropbox.filesSearch({ path: '', query: search })
          .then(function (response) {
            const files = response.matches.map(file => {
              return file.metadata
            });

            console.log(files)
            updateData(files)
          })
      }

    }

  }, [token, search]);

  console.log("Data: ", data);
  return (
    <>

      <input type="text" placeholder="search..." onChange={(e) => { updateSearch(e.target.value); }} value={search} />

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
    </>
  );
}

export default Home;