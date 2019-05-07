import React, { useState, useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import { Helmet } from 'react-helmet';
import './Home.css';
import { Dropbox } from 'dropbox';
import { token$, updateToken } from './store.js';

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
            updateData(files)
          })
      }

    }

  }, [token, search]);

  function onClickFavorite(event) {
    console.log('Making folder or file a favorite...');
  }

  console.log("Data: ", data);

  return (
    <>

      <input type="text" placeholder="search..." onChange={(e) => { updateSearch(e.target.value); }} value={search} />


      <Table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Last modified</th>
              <th>Size</th>
              <th>Menu</th>
              <th><i class="material-icons">star_border</i></th>
            </tr>
          </thead>
          <tbody>
            {data.map((file) => {
              return (
                <tr key={file.id}>
                  <td>{file[".tag"] === "folder" ? <i class="material-icons">folder_open</i> : file[".tag"] }</td>
                  <td>{file.name}</td>
                  <td></td>
                  <td></td>
                  <td><i class="material-icons">more_horiz</i></td>
                  <td><i class="material-icons" onClick={onClickFavorite}>star_border</i></td>
                </tr>
              )
            })}
          </tbody>
       </Table>

    </>
  );
}

export default Home;
